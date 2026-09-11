"use client";

import Image from "next/image";
import { useState } from "react";
import { isFavourite, toggleFavourite } from "@/lib/favourites";
import type { Meal, UKStore, UserPreferences } from "@/lib/types";
import { describeMeal } from "@/lib/ai-copy";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getMealImage } from "@/lib/meal-images";
import {
  getProduct,
  getIngredientFraction,
  productPrice,
  formatProductAmount,
} from "@/lib/grocery-prices";

const RATINGS = [4.7, 4.8, 4.9, 4.6, 5.0];

function ratingFor(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return RATINGS[sum % RATINGS.length].toFixed(1);
}

function difficultyLabel(prepTime: number): string {
  if (prepTime <= 10) return "Easy";
  if (prepTime <= 25) return "Medium";
  return "Involved";
}

export default function MealCard({
  meal,
  preferences,
  onSwap,
  selectedStore,
  useLoyalty = false,
}: {
  meal: Meal;
  preferences?: UserPreferences;
  onSwap?: () => void;
  selectedStore?: UKStore;
  useLoyalty?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const copy = preferences ? describeMeal(meal, preferences) : null;
  const [favourite, setFavourite] = useState(() => isFavourite(meal.name));
  const { format } = useCurrency();
  const householdSize = preferences?.householdSize ?? 1;

  const totalCost = meal.ingredients.reduce((sum, i) => sum + i.estimatedCost, 0) * householdSize;
  const rating = ratingFor(meal.name);
  const highProtein = meal.protein >= 20;

  return (
    <article className="card overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={getMealImage(meal.type, meal.name)}
          alt={meal.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <button
          type="button"
          aria-label={favourite ? "Remove from favourites" : "Save to favourites"}
          onClick={(e) => {
            e.stopPropagation();
            setFavourite(toggleFavourite(meal.name));
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-muted shadow-sm transition hover:scale-110"
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
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
            {difficultyLabel(meal.prepTime)}
          </span>
          {highProtein && (
            <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-accent shadow-sm">
              High protein
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
            {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
          </span>
          <span className="text-sm font-medium">{meal.prepTime} min</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-serif text-lg font-semibold leading-tight text-foreground">
              {copy?.headline ?? meal.name}
            </h4>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span className="flex items-center gap-1 text-amber-600">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {rating}
              </span>
              <span>·</span>
              <span>{meal.prepTime} min</span>
              <span>·</span>
              <span>{meal.calories} kcal</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-serif text-xl font-bold text-primary">{format(totalCost)}</p>
            <p className="text-xs text-muted">per meal</p>
          </div>
        </div>

        {copy && (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {copy.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {copy?.sellingPoints.map((point) => (
            <span
              key={point}
              className="rounded-full bg-primary-light/60 px-3 py-1 text-xs font-medium text-primary"
            >
              {point}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex-1 rounded-full border border-card-border py-2.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
          >
            {expanded ? "Close recipe" : "View recipe"}
          </button>
          {onSwap && (
            <button
              type="button"
              onClick={onSwap}
              className="flex-1 rounded-full bg-primary-light py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Swap
            </button>
          )}
        </div>

        {expanded && copy && (
          <div className="mt-5 border-t border-card-border pt-4">
            <div className="mb-4 rounded-xl bg-primary-light/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Chef&apos;s note
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">
                {copy.rationale}
              </p>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-primary-light/30 p-2 text-center">
                <p className="text-xs text-muted">Protein</p>
                <p className="text-sm font-bold text-primary">{meal.protein}g</p>
              </div>
              <div className="rounded-xl bg-secondary-light/40 p-2 text-center">
                <p className="text-xs text-muted">Carbs</p>
                <p className="text-sm font-bold text-secondary">{meal.carbs}g</p>
              </div>
              <div className="rounded-xl bg-accent-light/40 p-2 text-center">
                <p className="text-xs text-muted">Fat</p>
                <p className="text-sm font-bold text-accent">{meal.fat}g</p>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="mb-2 text-sm font-semibold">Ingredients</h5>
              <ul className="space-y-2">
                {meal.ingredients.map((ing, i) => {
                  const product = selectedStore ? getProduct(ing.name, selectedStore) : null;
                  const fraction = getIngredientFraction(ing.name);
                  const perMeal = product
                    ? product.packAmount * fraction * householdSize
                    : 0;
                  const packPrice = product ? productPrice(product, useLoyalty) : null;

                  return (
                    <li key={i} className="text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted">
                          {ing.quantity} {ing.unit} {ing.name}
                        </span>
                        <span className="text-xs font-medium text-primary">
                          {format(ing.estimatedCost * householdSize)}
                        </span>
                      </div>
                      {product && (
                        <p className="mt-0.5 text-xs text-muted">
                          {product.productName} — {formatProductAmount(perMeal, product.unit)} used
                          {packPrice !== null && ` · ${format(packPrice)} pack`}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mb-3">
              <h5 className="mb-2 text-sm font-semibold">Instructions</h5>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted">
                {meal.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            {meal.wasteReductionTip && (
              <div className="rounded-xl bg-primary-light/30 p-3">
                <p className="text-xs font-semibold text-primary">Waste-saver tip</p>
                <p className="mt-1 text-xs text-muted">{meal.wasteReductionTip}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
