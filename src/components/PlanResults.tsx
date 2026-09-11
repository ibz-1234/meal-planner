"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  WeeklyPlan,
  BasketProduct,
  UKStore,
  ShoppingListItem,
} from "@/lib/types";
import { swapMeal } from "@/lib/plan-generator";
import { describePlan, isDayLocked, chefScore } from "@/lib/ai-copy";
import { isPremium, TIER_CHANGED_EVENT } from "@/lib/subscription";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  calculatePlanBasket,
  comparePlanStores,
  basketTotal,
  UK_STORES,
  UK_PRICE_TABLE_UPDATED,
} from "@/lib/grocery-prices";
import ChefAiIntro from "./ChefAiIntro";
import LockedDay from "./LockedDay";
import MealCard from "./MealCard";
import ShoppingList from "./ShoppingList";
import SupermarketComparison from "./SupermarketComparison";
import WasteReductionTips from "./WasteReductionTips";

type TabId = "meals" | "shopping" | "stores" | "waste";

const TABS: { id: TabId; label: string }[] = [
  { id: "meals", label: "Meals" },
  { id: "shopping", label: "Shopping" },
  { id: "stores", label: "Stores" },
  { id: "waste", label: "Waste" },
];

function getPlanFromStorage(): WeeklyPlan | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem("mealPlan");
  try {
    return stored ? (JSON.parse(stored) as WeeklyPlan) : null;
  } catch {
    return null;
  }
}

function basketToShoppingList(basket: BasketProduct[]): ShoppingListItem[] {
  return basket.map((item) => ({
    ingredient: item.ingredient,
    totalQuantity: `${item.packsNeeded} x ${item.product.packSize}`,
    unit: item.product.unit,
    category: item.product.category,
    estimatedCost: item.totalPrice,
    checked: false,
  }));
}

export default function PlanResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { format } = useCurrency();
  const [plan, setPlan] = useState<WeeklyPlan | null>(getPlanFromStorage);
  const initialTab: TabId =
    (searchParams?.get("tab") as TabId) && TABS.some((t) => t.id === searchParams?.get("tab"))
      ? (searchParams?.get("tab") as TabId)
      : "meals";
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const [selectedDay, setSelectedDay] = useState(0);
  const [premium, setPremium] = useState(false);
  const [selectedStore, setSelectedStore] = useState<UKStore | null>(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("mmp-preferred-store")
        : null;
    const p = getPlanFromStorage();
    if (saved && UK_STORES.includes(saved as UKStore)) return saved as UKStore;
    return p?.selectedStore ?? null;
  });
  const [useLoyalty, setUseLoyalty] = useState(() => {
    const p = getPlanFromStorage();
    return p?.priceModel === "loyalty";
  });

  useEffect(() => {
    const sync = () => setPremium(isPremium());
    sync();
    window.addEventListener(TIER_CHANGED_EVENT, sync);
    return () => window.removeEventListener(TIER_CHANGED_EVENT, sync);
  }, []);

  const handleSwap = (dayIndex: number, mealIndex: number) => {
    setPlan((current) => {
      if (!current) return current;
      const updated = swapMeal(current, dayIndex, mealIndex);
      sessionStorage.setItem("mealPlan", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectStore = (store: UKStore) => {
    setSelectedStore(store);
    setPlan((current) => {
      if (!current) return current;
      const updated = { ...current, selectedStore: store };
      sessionStorage.setItem("mealPlan", JSON.stringify(updated));
      return updated;
    });
    try {
      localStorage.setItem("mmp-preferred-store", store);
    } catch (err) {
      console.warn("[stores] Could not persist preferred store:", err);
    }
  };

  const handleToggleLoyalty = (value: boolean) => {
    setUseLoyalty(value);
    setPlan((current) => {
      if (!current) return current;
      const updated = { ...current, priceModel: (value ? "loyalty" : "regular") as WeeklyPlan["priceModel"] };
      sessionStorage.setItem("mealPlan", JSON.stringify(updated));
      return updated;
    });
  };

  const comparison = useMemo(() => {
    if (!plan) return [];
    return comparePlanStores(plan.days, plan.preferences.householdSize, useLoyalty);
  }, [plan, useLoyalty]);

  const effectiveStore: UKStore =
    selectedStore ?? plan?.selectedStore ?? comparison[0]?.store ?? "Aldi";

  const currentBasket = useMemo(() => {
    if (!plan) return [];
    return calculatePlanBasket(
      plan.days,
      plan.preferences.householdSize,
      effectiveStore,
      useLoyalty
    );
  }, [plan, effectiveStore, useLoyalty]);

  const totalWeeklyCost = basketTotal(currentBasket);

  const scoredPlan = useMemo(() => {
    if (!plan) return null;
    return {
      ...plan,
      totalWeeklyCost,
      shoppingList: basketToShoppingList(currentBasket),
    } as WeeklyPlan;
  }, [plan, totalWeeklyCost, currentBasket]);

  const narrative = useMemo(
    () => (scoredPlan ? describePlan(scoredPlan) : null),
    [scoredPlan]
  );
  const score = useMemo(
    () => (scoredPlan ? chefScore(scoredPlan, format) : null),
    [scoredPlan, format]
  );

  if (!plan) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="card max-w-md p-8 text-center">
          <p className="font-serif text-2xl font-bold">No plan yet</p>
          <p className="mt-2 text-muted">
            Build your first week in under a minute and Chef AI will take care of the rest.
          </p>
          <button
            onClick={() => router.push("/preview")}
            className="btn-primary mt-6 w-full"
          >
            Build my week →
          </button>
        </div>
      </div>
    );
  }

  const weeklyBudget =
    plan.preferences.budgetPeriod === "weekly"
      ? plan.preferences.budget
      : plan.preferences.budget / 4.33;
  const underBudget = totalWeeklyCost <= weeklyBudget;
  const budgetDiff = Math.abs(totalWeeklyCost - weeklyBudget);
  const mealCount = plan.days.reduce((s, d) => s + d.meals.length, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      {narrative && <ChefAiIntro narrative={narrative} premium={premium} />}

      {/* Dashboard header */}
      <div className="card mb-6 p-5 sm:p-6 animate-fade-in-up">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-bold text-primary">{plan.preferences.fitnessGoal}</span>
              {plan.preferences.dietaryRestrictions.length > 0 && (
                <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-bold text-accent">
                  {plan.preferences.dietaryRestrictions.join(", ")}
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {mealCount} meals · {plan.preferences.householdSize}{" "}
              {plan.preferences.householdSize === 1 ? "person" : "people"}
            </h1>
            <p className="mt-2 text-sm text-muted">
              Estimated weekly shop for your household
            </p>
          </div>
          <div className="flex flex-wrap gap-4 sm:justify-end">
            <div className="min-w-[7rem] rounded-2xl bg-primary-light/40 p-3 text-center">
              <p className="text-xs font-semibold text-primary">Estimated</p>
              <p className="font-serif text-xl font-bold text-foreground">{format(totalWeeklyCost)}</p>
            </div>
            <div className="min-w-[7rem] rounded-2xl bg-primary-light/40 p-3 text-center">
              <p className="text-xs font-semibold text-primary">
                {underBudget ? "Under budget" : "Over budget"}
              </p>
              <p className={`font-serif text-xl font-bold ${underBudget ? "text-accent" : "text-danger"}`}>
                {format(budgetDiff)}
              </p>
            </div>
            {score && (
              <div className="min-w-[7rem] rounded-2xl bg-primary p-3 text-center text-white">
                <p className="text-xs font-semibold text-primary-light">Chef Score</p>
                <p className="font-serif text-2xl font-bold">{score.overall}</p>
              </div>
            )}
          </div>
        </div>

        {score && (
          <div className="mt-5 grid gap-3 border-t border-card-border pt-5 sm:grid-cols-4">
            {[
              { label: "Nutrition", value: score.nutrition, color: "bg-accent" },
              { label: "Budget", value: score.budget, color: "bg-primary" },
              { label: "Waste", value: score.waste, color: "bg-secondary" },
              { label: "Convenience", value: score.convenience, color: "bg-amber-500" },
            ].map((s) => (
              <div key={s.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted">{s.label}</span>
                  <span className="font-semibold">{s.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-primary-light/40">
                  <div
                    className={`h-full rounded-full ${s.color} transition-all`}
                    style={{ width: `${Math.min(100, Math.max(0, s.value))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-sm"
                : "bg-card border border-card-border text-muted hover:border-primary hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "meals" && (
        <div>
          {/* Week strip */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
            {plan.days.map((day, i) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(i)}
                className={`flex shrink-0 flex-col items-center rounded-2xl px-4 py-3 text-sm transition-all ${
                  selectedDay === i
                    ? "bg-primary text-white shadow-md"
                    : "bg-card border border-card-border text-muted hover:border-primary"
                }`}
              >
                <span className="font-semibold">
                  {isDayLocked(i, premium) && "🔒 "}
                  {day.day.slice(0, 3)}
                </span>
                <span className="mt-0.5 text-xs opacity-80">{format(day.totalCost)}</span>
              </button>
            ))}
          </div>

          {/* Selected day */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                {plan.days[selectedDay].day}
              </p>
              <p className="font-serif text-lg font-bold">
                {plan.days[selectedDay].meals.reduce((s, m) => s + m.calories, 0)} kcal ·{" "}
                {plan.days[selectedDay].meals.reduce((s, m) => s + m.prepTime, 0)} min
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/preview")}
                className="rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                Regenerate week
              </button>
            </div>
          </div>

          {isDayLocked(selectedDay, premium) ? (
            <LockedDay day={plan.days[selectedDay]} preferences={plan.preferences} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {plan.days[selectedDay].meals.map((meal, i) => (
                <MealCard
                  key={`${meal.name}-${i}`}
                  meal={meal}
                  preferences={plan.preferences}
                  onSwap={() => handleSwap(selectedDay, i)}
                  selectedStore={effectiveStore}
                  useLoyalty={useLoyalty}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "shopping" && (
        <ShoppingList
          basket={currentBasket}
          priceDate={UK_PRICE_TABLE_UPDATED}
        />
      )}

      {activeTab === "stores" && (
        <SupermarketComparison
          comparison={comparison}
          selectedStore={effectiveStore}
          onSelectStore={handleSelectStore}
          useLoyalty={useLoyalty}
          onToggleLoyalty={handleToggleLoyalty}
          priceDate={UK_PRICE_TABLE_UPDATED}
        />
      )}

      {activeTab === "waste" && <WasteReductionTips tips={plan.wasteReductionTips} />}
    </div>
  );
}
