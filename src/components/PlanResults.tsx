"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DayPlan, WeeklyPlan } from "@/lib/types";
import { generateShoppingList, swapMeal } from "@/lib/plan-generator";
import { WASTE_REDUCTION_TIPS } from "@/lib/meal-data";
import {
  decodeSharedPlan,
  encodeSharedPlan,
  findMealByName,
} from "@/lib/recipes";
import { isPaid } from "@/lib/billing";
import { useCurrency } from "@/contexts/CurrencyContext";
import MealCard from "./MealCard";
import ShoppingList from "./ShoppingList";
import SupermarketComparison from "./SupermarketComparison";
import WasteReductionTips from "./WasteReductionTips";
import { IconLeaf, IconNote, IconShop, IconUtensils } from "@/lib/icons";

type TabId = "meals" | "shopping" | "stores" | "waste";

const TABS: { id: TabId; label: string; Icon: (p: { className?: string }) => React.JSX.Element }[] = [
  { id: "meals", label: "Meal Plan", Icon: IconUtensils },
  { id: "shopping", label: "Shopping List", Icon: IconNote },
  { id: "stores", label: "Compare Stores", Icon: IconShop },
  { id: "waste", label: "Reduce Waste", Icon: IconLeaf },
];

function mealCost(meal: { ingredients: { estimatedCost: number }[] }): number {
  return meal.ingredients.reduce((s, i) => s + i.estimatedCost, 0);
}

function rebuildDayTotals(days: DayPlan[], scaleFactor: number): DayPlan[] {
  return days.map((d) => ({
    ...d,
    totalCalories: d.meals.reduce((s, m) => s + m.calories, 0),
    totalCost:
      Math.round(
        d.meals.reduce((s, m) => s + mealCost(m), 0) * scaleFactor * 100
      ) / 100,
  }));
}

function getPlanFromStorage(): WeeklyPlan | null {
  if (typeof window === "undefined") return null;

  const shared = new URLSearchParams(window.location.search).get("p");
  if (shared) {
    const payload = decodeSharedPlan(shared);
    if (payload) {
      const scaleFactor = payload.preferences.householdSize;
      const days: DayPlan[] = payload.days.map((d) => ({
        day: d.day,
        meals: d.meals
          .map((name) => findMealByName(name))
          .filter((m): m is NonNullable<typeof m> => Boolean(m)),
        totalCalories: 0,
        totalCost: 0,
      }));
      const rebuiltDays = rebuildDayTotals(days, scaleFactor);
      const totalWeeklyCost =
        Math.round(rebuiltDays.reduce((s, d) => s + d.totalCost, 0) * 100) / 100;
      return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        preferences: payload.preferences,
        days: rebuiltDays,
        totalWeeklyCost,
        shoppingList: generateShoppingList(rebuiltDays).map((item) => ({
          ...item,
          estimatedCost: Math.round(item.estimatedCost * scaleFactor * 100) / 100,
        })),
        supermarketComparison: [],
        wasteReductionTips: WASTE_REDUCTION_TIPS.slice(0, 5),
      };
    }
  }

  const stored = sessionStorage.getItem("mealPlan");
  return stored ? (JSON.parse(stored) as WeeklyPlan) : null;
}

export default function PlanResults() {
  const router = useRouter();
  const { format } = useCurrency();
  const [plan, setPlan] = useState<WeeklyPlan | null>(getPlanFromStorage);
  const [swapBlocked, setSwapBlocked] = useState(false);

  const persist = (updated: WeeklyPlan) => {
    sessionStorage.setItem("mealPlan", JSON.stringify(updated));
    return updated;
  };

  const handleSwap = (dayIndex: number, mealIndex: number) => {
    if (!isPaid()) {
      setSwapBlocked(true);
      return;
    }
    setPlan((current) => {
      if (!current) return current;
      return persist(swapMeal(current, dayIndex, mealIndex));
    });
  };

  const handleMoveMeal = (fromDay: number, mealIndex: number, toDay: number) => {
    if (fromDay === toDay) return;
    setPlan((current) => {
      if (!current) return current;
      const days = current.days.map((d) => ({ ...d, meals: [...d.meals] }));
      const [meal] = days[fromDay].meals.splice(mealIndex, 1);
      if (!meal) return current;
      days[toDay].meals.push(meal);
      const scaleFactor = current.preferences.householdSize;
      return persist({
        ...current,
        days: rebuildDayTotals(days, scaleFactor),
      });
    });
  };

  const handleShare = async () => {
    if (!plan) return;
    const url = `${window.location.origin}/plan?p=${encodeSharedPlan(plan)}`;
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      window.prompt("Copy your plan link:", url);
    }
  };
  const [activeTab, setActiveTab] = useState<TabId>("meals");
  const [selectedDay, setSelectedDay] = useState(0);
  const [shared, setShared] = useState(false);

  if (!plan) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-8 w-8 animate-spin text-primary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="mt-2 text-muted">Loading your plan...</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 text-sm text-primary underline"
          >
            Create a new plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Summary Banner */}
      <div className="hard mb-6 rounded-xl bg-primary p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Your Weekly Meal Plan</h2>
            <p className="mt-1 opacity-90">
              {plan.preferences.fitnessGoal} · {plan.preferences.householdSize}{" "}
              {plan.preferences.householdSize === 1 ? "person" : "people"} ·{" "}
              {plan.preferences.dietaryRestrictions.length > 0
                ? plan.preferences.dietaryRestrictions.join(", ")
                : "No restrictions"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleShare}
              className="rounded-xl bg-white/15 px-4 py-2 text-sm font-bold transition hover:bg-white/25"
            >
              {shared ? "Link copied" : "Share plan"}
            </button>
            <div className="text-right">
              <p className="text-3xl font-bold">{format(plan.totalWeeklyCost)}</p>
              <p className="text-sm opacity-90">estimated weekly cost</p>
            </div>
          </div>
        </div>
      </div>

      {swapBlocked && (
        <div className="hard-sm mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-secondary-light p-4">
          <p className="text-sm">
            Meal swapping is a Premium feature — swap any meal with one tap,
            plus unlimited plans every month.
          </p>
          <button
            onClick={() => router.push("/checkout?plan=premium")}
            className="btn btn-primary !px-4 !py-2 !text-sm"
          >
            Upgrade
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-md"
                : "bg-card border border-card-border text-muted hover:border-primary"
            }`}
          >
            <tab.Icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "meals" && (
        <div>
          {/* Day Selector */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
            {plan.days.map((day, i) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const raw = e.dataTransfer.getData("text/plain");
                  try {
                    const { dayIndex, mealIndex } = JSON.parse(raw);
                    handleMoveMeal(dayIndex, mealIndex, i);
                    setSelectedDay(i);
                  } catch {
                    /* ignore stray drops */
                  }
                }}
                className={`flex shrink-0 flex-col items-center rounded-xl px-4 py-3 text-sm transition-all ${
                  selectedDay === i
                    ? "bg-accent text-white shadow-md"
                    : "bg-card border border-card-border text-muted hover:border-accent"
                }`}
              >
                <span className="font-semibold">{day.day.slice(0, 3)}</span>
                <span className="mt-0.5 text-xs opacity-80">
                  {format(day.totalCost)}
                </span>
              </button>
            ))}
          </div>

          {/* Day Summary */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-card border border-card-border p-3 text-center">
              <p className="text-xs text-muted">Calories</p>
              <p className="text-lg font-bold text-foreground">
                {plan.days[selectedDay].totalCalories}
              </p>
            </div>
            <div className="rounded-xl bg-card border border-card-border p-3 text-center">
              <p className="text-xs text-muted">Meals</p>
              <p className="text-lg font-bold text-foreground">
                {plan.days[selectedDay].meals.length}
              </p>
            </div>
            <div className="rounded-xl bg-card border border-card-border p-3 text-center">
              <p className="text-xs text-muted">Cost</p>
              <p className="text-lg font-bold text-primary">
                {format(plan.days[selectedDay].totalCost)}
              </p>
            </div>
            <div className="rounded-xl bg-card border border-card-border p-3 text-center">
              <p className="text-xs text-muted">Prep Time</p>
              <p className="text-lg font-bold text-foreground">
                {plan.days[selectedDay].meals.reduce(
                  (sum, m) => sum + m.prepTime,
                  0
                )}{" "}
                min
              </p>
            </div>
          </div>

          {/* Meals */}
          <div className="space-y-3">
            {plan.days[selectedDay].meals.map((meal, i) => (
              <div
                key={`${meal.name}-${i}`}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData(
                    "text/plain",
                    JSON.stringify({ dayIndex: selectedDay, mealIndex: i })
                  )
                }
                className="cursor-grab active:cursor-grabbing"
                title="Drag onto another day to move this meal"
              >
                <MealCard
                  meal={meal}
                  onSwap={() => handleSwap(selectedDay, i)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "shopping" && <ShoppingList items={plan.shoppingList} />}

      {activeTab === "stores" && (
        <SupermarketComparison
          weeklyBasketGBP={plan.totalWeeklyCost}
          items={plan.shoppingList.map((item) => ({
            ingredient: item.ingredient,
            estimatedCost: item.estimatedCost,
          }))}
        />
      )}

      {activeTab === "waste" && (
        <WasteReductionTips tips={plan.wasteReductionTips} />
      )}

      {/* Generate New Plan */}
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push("/")}
          className="rounded-xl border border-card-border bg-card px-8 py-3 font-semibold text-muted transition-all hover:border-primary hover:text-primary"
        >
          Generate New Plan
        </button>
      </div>
    </div>
  );
}
