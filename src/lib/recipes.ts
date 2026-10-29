// Unified recipe lookup: homepage showcase recipes (RECIPE_DETAILS) and
// plan-generator meals (ALL_MEALS), addressable by URL-safe slug.

import { ALL_MEALS } from "./meal-data";
import { RECIPE_DETAILS, type RecipeDetail } from "./recipe-details";
import type { Meal } from "./types";
import { getMealImage } from "./meal-images";

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ALL_MEALS_LIST: Meal[] = [
  ...ALL_MEALS.breakfast,
  ...ALL_MEALS.lunch,
  ...ALL_MEALS.dinner,
  ...ALL_MEALS.snack,
];

const MEAL_BY_NAME = new Map(
  ALL_MEALS_LIST.map((m) => [m.name.toLowerCase(), m])
);

export function findMealByName(name: string): Meal | undefined {
  return MEAL_BY_NAME.get(name.toLowerCase());
}

export interface ResolvedRecipe {
  name: string;
  slug: string;
  image: string;
  type: string;
  prepTime?: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  servings?: number;
  baseCostGBP?: number;
  ingredients: { label: string; cost?: number }[];
  steps: string[];
  wasteTip?: string;
}

const HOMEPAGE_IMAGES: Record<string, string> = {};

function resolveFromMeal(meal: Meal): ResolvedRecipe {
  return {
    name: meal.name,
    slug: slugify(meal.name),
    image: getMealImage(meal.type, meal.name),
    type: meal.type,
    prepTime: meal.prepTime,
    calories: meal.calories,
    protein: meal.protein,
    carbs: meal.carbs,
    fat: meal.fat,
    ingredients: meal.ingredients.map((i) => ({
      label: `${i.quantity} ${i.unit} ${i.name}`.replace(/\s+/g, " ").trim(),
      cost: i.estimatedCost,
    })),
    steps: meal.instructions,
    wasteTip: meal.wasteReductionTip,
    baseCostGBP:
      Math.round(
        meal.ingredients.reduce((s, i) => s + i.estimatedCost, 0) * 100
      ) / 100,
  };
}

function resolveFromDetail(name: string, d: RecipeDetail): ResolvedRecipe {
  return {
    name,
    slug: slugify(name),
    image: HOMEPAGE_IMAGES[name] ?? getMealImage("dinner", name),
    type: "recipe",
    servings: d.servings,
    baseCostGBP: d.baseCostGBP,
    ingredients: d.ingredients.map((label) => ({ label })),
    steps: d.steps,
  };
}

export function getRecipeBySlug(slug: string): ResolvedRecipe | null {
  for (const meal of ALL_MEALS_LIST) {
    if (slugify(meal.name) === slug) return resolveFromMeal(meal);
  }
  for (const [name, detail] of Object.entries(RECIPE_DETAILS)) {
    if (slugify(name) === slug) return resolveFromDetail(name, detail);
  }
  return null;
}

export function allRecipeSlugs(): string[] {
  const slugs = new Set<string>();
  for (const meal of ALL_MEALS_LIST) slugs.add(slugify(meal.name));
  for (const name of Object.keys(RECIPE_DETAILS)) slugs.add(slugify(name));
  return [...slugs];
}

// For the homepage modal: link to the canonical recipe page when one exists.
export function recipePageHref(name: string): string {
  return `/recipe/${slugify(name)}`;
}

// ── Pantry matching ─────────────────────────────────────────────────────────

export function matchMealsByPantry(have: string[]): {
  meal: Meal;
  matched: string[];
  missing: string[];
  score: number;
}[] {
  if (have.length === 0) return [];
  const needles = have.map((h) => h.toLowerCase().trim()).filter(Boolean);
  return ALL_MEALS_LIST.map((meal) => {
    const ingNames = meal.ingredients.map((i) => i.name.toLowerCase());
    const matched = meal.ingredients
      .filter((i) =>
        needles.some(
          (n) =>
            i.name.toLowerCase().includes(n) || n.includes(i.name.toLowerCase())
        )
      )
      .map((i) => i.name);
    const missing = meal.ingredients
      .map((i) => i.name)
      .filter((n) => !matched.includes(n));
    const score = matched.length / Math.max(ingNames.length, 1);
    return { meal, matched, missing, score };
  })
    .filter((r) => r.matched.length > 0)
    .sort((a, b) => b.score - a.score || b.matched.length - a.matched.length);
}

// ── Shareable plans ─────────────────────────────────────────────────────────

import type { WeeklyPlan, DayPlan, UserPreferences } from "./types";

export interface SharedPlanPayload {
  preferences: UserPreferences;
  days: { day: string; meals: string[] }[];
}

export function encodeSharedPlan(plan: WeeklyPlan): string {
  const payload: SharedPlanPayload = {
    preferences: plan.preferences,
    days: plan.days.map((d) => ({
      day: d.day,
      meals: d.meals.map((m) => m.name),
    })),
  };
  const json = JSON.stringify(payload);
  return typeof window !== "undefined"
    ? btoa(unescape(encodeURIComponent(json)))
    : Buffer.from(json, "utf8").toString("base64");
}

export function decodeSharedPlan(encoded: string): SharedPlanPayload | null {
  try {
    const json =
      typeof window !== "undefined"
        ? decodeURIComponent(escape(atob(encoded)))
        : Buffer.from(encoded, "base64").toString("utf8");
    return JSON.parse(json) as SharedPlanPayload;
  } catch {
    return null;
  }
}
