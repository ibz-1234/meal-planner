"use client";

import { useState } from "react";
import type { Meal } from "@/lib/types";

export default function MealCard({ meal }: { meal: Meal }) {
  const [expanded, setExpanded] = useState(false);

  const mealTypeColors: Record<string, string> = {
    breakfast: "bg-secondary-light text-secondary",
    lunch: "bg-primary-light text-primary",
    dinner: "bg-accent-light text-accent",
    snack: "bg-danger-light text-danger",
  };

  const totalCost = meal.ingredients.reduce((sum, i) => sum + i.estimatedCost, 0);

  return (
    <div className="rounded-xl border border-card-border bg-card transition-shadow hover:shadow-md">
      <div
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${mealTypeColors[meal.type] ?? ""}`}
          >
            {meal.type}
          </span>
          <div>
            <h4 className="font-semibold text-foreground">{meal.name}</h4>
            <p className="text-xs text-muted">{meal.prepTime} min prep</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="font-medium text-primary">${totalCost.toFixed(2)}</span>
          <span className="text-muted">{meal.calories} cal</span>
          <svg
            className={`h-5 w-5 text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-card-border px-4 pb-4 pt-3">
          {/* Macros */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-background p-2 text-center">
              <p className="text-xs text-muted">Protein</p>
              <p className="text-sm font-bold text-primary">{meal.protein}g</p>
            </div>
            <div className="rounded-lg bg-background p-2 text-center">
              <p className="text-xs text-muted">Carbs</p>
              <p className="text-sm font-bold text-secondary">{meal.carbs}g</p>
            </div>
            <div className="rounded-lg bg-background p-2 text-center">
              <p className="text-xs text-muted">Fat</p>
              <p className="text-sm font-bold text-accent">{meal.fat}g</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-3">
            <h5 className="mb-2 text-sm font-semibold">Ingredients</h5>
            <ul className="space-y-1">
              {meal.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted">
                    {ing.quantity} {ing.unit} {ing.name}
                  </span>
                  <span className="text-xs font-medium text-primary">
                    ${ing.estimatedCost.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-3">
            <h5 className="mb-2 text-sm font-semibold">Instructions</h5>
            <ol className="list-inside list-decimal space-y-1 text-sm text-muted">
              {meal.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Waste Tip */}
          {meal.wasteReductionTip && (
            <div className="rounded-lg bg-primary-light/50 p-3">
              <p className="text-xs font-semibold text-primary">♻️ Waste Reduction Tip</p>
              <p className="mt-1 text-xs text-muted">{meal.wasteReductionTip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
