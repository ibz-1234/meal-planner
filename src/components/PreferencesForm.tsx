"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DIETARY_RESTRICTIONS, FITNESS_GOALS, ALLERGIES } from "@/lib/meal-data";
import { generateWeeklyPlan } from "@/lib/plan-generator";
import type { UserPreferences } from "@/lib/types";
import { useCurrency } from "@/contexts/CurrencyContext";
import { convertToGBP, currencySymbol } from "@/lib/currency";

export default function PreferencesForm() {
  const router = useRouter();
  const { country } = useCurrency();
  const symbol = currencySymbol(country);
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState(100);
  const [budgetPeriod, setBudgetPeriod] = useState<"weekly" | "monthly">("weekly");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [householdSize, setHouseholdSize] = useState(1);
  const [cookingSkill, setCookingSkill] = useState<"beginner" | "intermediate" | "advanced">("intermediate");

  const toggleItem = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const preferences: UserPreferences = {
      budget: convertToGBP(budget, country.currency),
      budgetPeriod,
      fitnessGoal,
      dietaryRestrictions,
      allergies,
      householdSize,
      cookingSkill,
    };

    try {
      const plan = generateWeeklyPlan(preferences);
      sessionStorage.setItem("mealPlan", JSON.stringify(plan));
      router.push("/plan");
    } catch {
      alert("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Budget */}
      <div className="rounded-xl border border-card-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-primary text-sm font-bold">{symbol}</span>
          Budget
        </h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-muted">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{symbol}</span>
              <input
                type="number"
                min={10}
                max={2000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full rounded-lg border border-card-border bg-background py-2.5 pl-8 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            {(["weekly", "monthly"] as const).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setBudgetPeriod(period)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  budgetPeriod === period
                    ? "bg-primary text-white"
                    : "border border-card-border bg-background text-muted hover:border-primary"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <input
          type="range"
          min={10}
          max={500}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="mt-4 w-full accent-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>{symbol}10</span>
          <span>{symbol}500</span>
        </div>
      </div>

      {/* Fitness Goal */}
      <div className="rounded-xl border border-card-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-light text-accent text-sm">💪</span>
          Fitness Goal
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {FITNESS_GOALS.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => setFitnessGoal(goal)}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                fitnessGoal === goal
                  ? "bg-accent text-white shadow-md"
                  : "border border-card-border bg-background text-muted hover:border-accent"
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div className="rounded-xl border border-card-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-light text-secondary text-sm">🥦</span>
          Dietary Restrictions
        </h3>
        <div className="flex flex-wrap gap-2">
          {DIETARY_RESTRICTIONS.map((restriction) => (
            <button
              key={restriction}
              type="button"
              onClick={() => toggleItem(restriction, dietaryRestrictions, setDietaryRestrictions)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                dietaryRestrictions.includes(restriction)
                  ? "bg-secondary text-white shadow-md"
                  : "border border-card-border bg-background text-muted hover:border-secondary"
              }`}
            >
              {restriction}
            </button>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div className="rounded-xl border border-card-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-danger-light text-danger text-sm">⚠️</span>
          Allergies
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALLERGIES.map((allergy) => (
            <button
              key={allergy}
              type="button"
              onClick={() => toggleItem(allergy, allergies, setAllergies)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                allergies.includes(allergy)
                  ? "bg-danger text-white shadow-md"
                  : "border border-card-border bg-background text-muted hover:border-danger"
              }`}
            >
              {allergy}
            </button>
          ))}
        </div>
      </div>

      {/* Household & Cooking Skill */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-card-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-primary text-sm">👥</span>
            Household Size
          </h3>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setHouseholdSize(Math.max(1, householdSize - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border text-lg font-bold text-muted transition-colors hover:border-primary hover:text-primary"
            >
              −
            </button>
            <span className="text-3xl font-bold text-foreground">{householdSize}</span>
            <button
              type="button"
              onClick={() => setHouseholdSize(Math.min(12, householdSize + 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border text-lg font-bold text-muted transition-colors hover:border-primary hover:text-primary"
            >
              +
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-light text-accent text-sm">👨‍🍳</span>
            Cooking Skill
          </h3>
          <div className="flex gap-2">
            {(["beginner", "intermediate", "advanced"] as const).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => setCookingSkill(skill)}
                className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium capitalize transition-all ${
                  cookingSkill === skill
                    ? "bg-accent text-white shadow-md"
                    : "border border-card-border bg-background text-muted hover:border-accent"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !fitnessGoal}
        className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating Your Plan...
          </span>
        ) : (
          "Generate My Meal Plan"
        )}
      </button>
    </form>
  );
}
