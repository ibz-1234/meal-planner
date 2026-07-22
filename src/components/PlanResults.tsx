"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { WeeklyPlan } from "@/lib/types";
import { useCurrency } from "@/contexts/CurrencyContext";
import MealCard from "./MealCard";
import ShoppingList from "./ShoppingList";
import SupermarketComparison from "./SupermarketComparison";
import WasteReductionTips from "./WasteReductionTips";

type TabId = "meals" | "shopping" | "stores" | "waste";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "meals", label: "Meal Plan", icon: "🍽️" },
  { id: "shopping", label: "Shopping List", icon: "📝" },
  { id: "stores", label: "Compare Stores", icon: "🏪" },
  { id: "waste", label: "Reduce Waste", icon: "♻️" },
];

function getPlanFromStorage(): WeeklyPlan | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem("mealPlan");
  return stored ? (JSON.parse(stored) as WeeklyPlan) : null;
}

export default function PlanResults() {
  const router = useRouter();
  const { format } = useCurrency();
  const [plan] = useState<WeeklyPlan | null>(getPlanFromStorage);
  const [activeTab, setActiveTab] = useState<TabId>("meals");
  const [selectedDay, setSelectedDay] = useState(0);

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
      <div className="mb-6 rounded-xl bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
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
          <div className="text-right">
            <p className="text-3xl font-bold">{format(plan.totalWeeklyCost)}</p>
            <p className="text-sm opacity-90">estimated weekly cost</p>
          </div>
        </div>
      </div>

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
            <span>{tab.icon}</span>
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
              <MealCard key={i} meal={meal} />
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
