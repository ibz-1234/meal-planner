"use client";

import Image from "next/image";
import { useState } from "react";
import { isFavourite, toggleFavourite } from "@/lib/favourites";
import type { Meal, UserPreferences } from "@/lib/types";
import { describeMeal } from "@/lib/ai-copy";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getMealImage } from "@/lib/meal-images";

function difficultyLabel(prepTime: number): string {
  if (prepTime <= 10) return "Easy";
  if (prepTime <= 25) return "Medium";
  return "Involved";
}

export default function MealCard({
  meal,
  preferences,
  onSwap,
}: {
  meal: Meal;
  preferences?: UserPreferences;
  onSwap?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const copy = preferences ? describeMeal(meal, preferences) : null;
  const [favourite, setFavourite] = useState(() => isFavourite(meal.name));
  const { format } = useCurrency();

  const mealTypeColors: Record<string, string> = {
    breakfast: "bg-secondary-light text-secondary",
    lunch: "bg-primary-light text-primary",
    dinner: "bg-accent-light text-accent",
    snack: "bg-danger-light text-danger",
  };

  const totalCost = meal.ingredients.reduce((sum, i) => sum + i.estimatedCost, 0);

  return (
    <div className="rounded-xl border border-card-border bg-card transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-background">
        <Image
          src={getMealImage(meal.type, meal.name)}
          alt={meal.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <button
          type="button"
          aria-label={favourite ? "Remove from favourites" : "Save to favourites"}
          onClick={(e) => {
            e.stopPropagation();
            setFavourite(toggleFavourite(meal.name));
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110"
        >
          <svg
            className={`h-5 w-5 ${favourite ? "fill-danger text-danger" : "fill-none text-muted"}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
          {difficultyLabel(meal.prepTime)}
        </span>
      </div>
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
            <p className="text-xs text-muted">
              {meal.prepTime} min prep · {format(totalCost)} per serving
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="font-medium text-primary">{format(totalCost)}</span>
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

      {copy && (
        <div className="border-t border-card-border px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            👨‍🍳 Chef AI says
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{copy.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {copy.sellingPoints.map((point) => (
              <span
                key={point}
                className="rounded-full bg-background px-2.5 py-1 text-xs text-muted"
              >
                {point}
              </span>
            ))}
          </div>
        </div>
      )}

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
                  <span className="text-xs font-medium text-primary">{format(ing.estimatedCost)}</span>
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

          {onSwap && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSwap();
              }}
              className="mb-3 w-full rounded-lg border border-primary/40 bg-primary-light/40 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-light"
            >
              ⇄ Swap this meal
            </button>
          )}

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
