import type {
  UserPreferences,
  WeeklyPlan,
  DayPlan,
  Meal,
  ShoppingListItem,
  SupermarketPrice,
} from "./types";
import { ALL_MEALS, SUPERMARKETS, WASTE_REDUCTION_TIPS } from "./meal-data";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function filterMealsByPreferences(
  meals: Meal[],
  preferences: UserPreferences
): Meal[] {
  return meals.filter((meal) => {
    const restrictionSet = new Set(
      preferences.dietaryRestrictions.map((r) => r.toLowerCase())
    );
    const allergySet = new Set(
      preferences.allergies.map((a) => a.toLowerCase())
    );

    if (restrictionSet.has("vegetarian") || restrictionSet.has("vegan")) {
      const meatIngredients = [
        "chicken",
        "turkey",
        "beef",
        "pork",
        "salmon",
        "tuna",
        "fish",
      ];
      const hasMeat = meal.ingredients.some((ing) =>
        meatIngredients.some((m) => ing.name.toLowerCase().includes(m))
      );
      if (hasMeat) return false;
    }

    if (restrictionSet.has("dairy-free") || restrictionSet.has("vegan")) {
      const dairyIngredients = [
        "yogurt",
        "cheese",
        "milk",
        "butter",
        "cream",
      ];
      const hasDairy = meal.ingredients.some((ing) =>
        dairyIngredients.some((d) => ing.name.toLowerCase().includes(d))
      );
      if (hasDairy) return false;
    }

    if (restrictionSet.has("gluten-free")) {
      const glutenIngredients = [
        "bread",
        "pasta",
        "tortilla",
        "croutons",
        "granola",
      ];
      const hasGluten = meal.ingredients.some((ing) =>
        glutenIngredients.some((g) => ing.name.toLowerCase().includes(g))
      );
      if (hasGluten) return false;
    }

    if (allergySet.has("peanuts") || allergySet.has("tree nuts")) {
      const nutIngredients = [
        "peanut",
        "almond",
        "walnut",
        "cashew",
        "nut",
      ];
      const hasNuts = meal.ingredients.some((ing) =>
        nutIngredients.some((n) => ing.name.toLowerCase().includes(n))
      );
      if (hasNuts) return false;
    }

    return true;
  });
}

function selectMealsForDay(
  preferences: UserPreferences,
  usedMeals: Set<string>
): Meal[] {
  const dailyBudget =
    preferences.budgetPeriod === "weekly"
      ? preferences.budget / 7
      : preferences.budget / 30;

  const breakfasts = filterMealsByPreferences(
    ALL_MEALS.breakfast,
    preferences
  );
  const lunches = filterMealsByPreferences(ALL_MEALS.lunch, preferences);
  const dinners = filterMealsByPreferences(ALL_MEALS.dinner, preferences);
  const snacks = filterMealsByPreferences(ALL_MEALS.snack, preferences);

  const pickRandom = (arr: Meal[]): Meal => {
    const available = arr.filter((m) => !usedMeals.has(m.name));
    const pool = available.length > 0 ? available : arr;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  let selectedMeals: Meal[] = [];
  let totalCost = 0;

  const breakfast = pickRandom(breakfasts);
  const lunch = pickRandom(lunches);
  const dinner = pickRandom(dinners);

  selectedMeals = [breakfast, lunch, dinner];
  totalCost = selectedMeals.reduce(
    (sum, meal) =>
      sum + meal.ingredients.reduce((s, i) => s + i.estimatedCost, 0),
    0
  );

  if (totalCost < dailyBudget * 0.85 && snacks.length > 0) {
    const snack = pickRandom(snacks);
    selectedMeals.push(snack);
  }

  selectedMeals.forEach((m) => usedMeals.add(m.name));

  let calorieTarget = 2000;
  if (preferences.fitnessGoal === "Weight Loss") calorieTarget = 1600;
  if (preferences.fitnessGoal === "Muscle Gain") calorieTarget = 2500;

  const totalCalories = selectedMeals.reduce((sum, m) => sum + m.calories, 0);
  const ratio = calorieTarget / totalCalories;

  return selectedMeals.map((meal) => ({
    ...meal,
    calories: Math.round(meal.calories * ratio),
    protein: Math.round(meal.protein * ratio),
    carbs: Math.round(meal.carbs * ratio),
    fat: Math.round(meal.fat * ratio),
  }));
}

function generateShoppingList(days: DayPlan[]): ShoppingListItem[] {
  const ingredientMap = new Map<
    string,
    { totalCost: number; quantities: string[]; unit: string; category: string }
  >();

  for (const day of days) {
    for (const meal of day.meals) {
      for (const ing of meal.ingredients) {
        const key = ing.name.toLowerCase();
        const existing = ingredientMap.get(key);
        if (existing) {
          existing.totalCost += ing.estimatedCost;
          existing.quantities.push(`${ing.quantity} ${ing.unit}`);
        } else {
          ingredientMap.set(key, {
            totalCost: ing.estimatedCost,
            quantities: [`${ing.quantity} ${ing.unit}`],
            unit: ing.unit,
            category: ing.category,
          });
        }
      }
    }
  }

  return Array.from(ingredientMap.entries()).map(([name, data]) => ({
    ingredient: name.charAt(0).toUpperCase() + name.slice(1),
    totalQuantity: data.quantities.join(" + "),
    unit: data.unit,
    category: data.category,
    estimatedCost: Math.round(data.totalCost * 100) / 100,
    checked: false,
  }));
}

function generateSupermarketComparison(
  baseCost: number
): SupermarketPrice[] {
  const priceMultipliers: Record<string, number> = {
    Walmart: 0.92,
    Aldi: 0.85,
    Kroger: 0.95,
    Costco: 0.82,
    Target: 1.0,
  };

  return SUPERMARKETS.map((store) => {
    const multiplier = priceMultipliers[store.store] ?? 1;
    const estimatedCost =
      Math.round(baseCost * multiplier * 100) / 100;
    return {
      ...store,
      totalEstimatedCost: estimatedCost,
      savings: Math.round((baseCost - estimatedCost) * 100) / 100,
    };
  }).sort((a, b) => a.totalEstimatedCost - b.totalEstimatedCost);
}

export function swapMeal(
  plan: WeeklyPlan,
  dayIndex: number,
  mealIndex: number
): WeeklyPlan {
  const current = plan.days[dayIndex].meals[mealIndex];
  const pool = filterMealsByPreferences(
    ALL_MEALS[current.type] ?? [],
    plan.preferences
  ).filter((m) => m.name !== current.name);
  if (pool.length === 0) return plan;

  const usedNames = new Set(
    plan.days.flatMap((d) => d.meals.map((m) => m.name))
  );
  const fresh = pool.filter((m) => !usedNames.has(m.name));
  const candidates = fresh.length > 0 ? fresh : pool;
  const replacement = candidates[Math.floor(Math.random() * candidates.length)];

  const scaleFactor = plan.preferences.householdSize;
  const days = plan.days.map((day, di) => {
    if (di !== dayIndex) return day;
    const meals = day.meals.map((m, mi) => (mi === mealIndex ? replacement : m));
    const totalCost =
      meals.reduce(
        (sum, meal) =>
          sum + meal.ingredients.reduce((s, i) => s + i.estimatedCost, 0),
        0
      ) * scaleFactor;
    return {
      ...day,
      meals,
      totalCalories: meals.reduce((sum, m) => sum + m.calories, 0),
      totalCost: Math.round(totalCost * 100) / 100,
    };
  });

  const totalWeeklyCost =
    Math.round(days.reduce((sum, d) => sum + d.totalCost, 0) * 100) / 100;

  const shoppingList = generateShoppingList(days).map((item) => ({
    ...item,
    estimatedCost: Math.round(item.estimatedCost * scaleFactor * 100) / 100,
  }));

  return {
    ...plan,
    days,
    totalWeeklyCost,
    shoppingList,
    supermarketComparison: generateSupermarketComparison(totalWeeklyCost),
  };
}

export function generateWeeklyPlan(
  preferences: UserPreferences
): WeeklyPlan {
  const usedMeals = new Set<string>();
  const scaleFactor = preferences.householdSize;

  const days: DayPlan[] = DAYS.map((day) => {
    const meals = selectMealsForDay(preferences, usedMeals);
    const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
    const totalCost =
      meals.reduce(
        (sum, meal) =>
          sum +
          meal.ingredients.reduce((s, i) => s + i.estimatedCost, 0),
        0
      ) * scaleFactor;

    return {
      day,
      meals,
      totalCalories,
      totalCost: Math.round(totalCost * 100) / 100,
    };
  });

  const totalWeeklyCost = Math.round(
    days.reduce((sum, d) => sum + d.totalCost, 0) * 100
  ) / 100;

  const shoppingList = generateShoppingList(days).map((item) => ({
    ...item,
    estimatedCost:
      Math.round(item.estimatedCost * scaleFactor * 100) / 100,
  }));

  const supermarketComparison =
    generateSupermarketComparison(totalWeeklyCost);

  const shuffledTips = [...WASTE_REDUCTION_TIPS].sort(
    () => Math.random() - 0.5
  );
  const wasteReductionTips = shuffledTips.slice(0, 5);

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    preferences,
    days,
    totalWeeklyCost,
    shoppingList,
    supermarketComparison,
    wasteReductionTips,
  };
}
