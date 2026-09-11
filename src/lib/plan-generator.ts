import type {
  UserPreferences,
  WeeklyPlan,
  DayPlan,
  Meal,
  ShoppingListItem,
  SupermarketPrice,
  UKStore,
  BasketProduct,
} from "./types";
import { ALL_MEALS, WASTE_REDUCTION_TIPS } from "./meal-data";
import {
  calculatePlanBasket,
  comparePlanStores,
  basketTotal,
  cheapestStoreForPlan,
} from "./grocery-prices";
import { getStoresForCountry } from "./stores";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function makeId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

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

  const perServingBudget = dailyBudget / preferences.householdSize;
  if (totalCost < perServingBudget * 0.85 && snacks.length > 0) {
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

function buildSupermarketPrices(
  days: DayPlan[],
  householdSize: number,
  useLoyalty: boolean
): SupermarketPrice[] {
  const totals = comparePlanStores(days, householdSize, useLoyalty);
  const dearest = totals[totals.length - 1]?.total ?? 0;
  const storeInfo = getStoresForCountry("GB");
  const meta = new Map(storeInfo.map((s) => [s.name, s]));

  return totals.map((t) => {
    const info = meta.get(t.store);
    return {
      store: t.store,
      totalEstimatedCost: t.total,
      savings: Math.round((dearest - t.total) * 100) / 100,
      logo: info?.logo ?? "🏪",
      affiliateUrl: info?.website ?? "#",
    };
  });
}

function buildShoppingList(basket: BasketProduct[]): ShoppingListItem[] {
  return basket.map((item) => ({
    ingredient: item.ingredient,
    totalQuantity: `${item.packsNeeded} x ${item.product.packSize}`,
    unit: item.product.unit,
    category: item.product.category,
    estimatedCost: item.totalPrice,
    checked: false,
  }));
}

function buildPlan(
  preferences: UserPreferences,
  days: DayPlan[],
  selectedStore: UKStore,
  priceModel: "regular" | "loyalty"
): WeeklyPlan {
  const basket = calculatePlanBasket(
    days,
    preferences.householdSize,
    selectedStore,
    priceModel === "loyalty"
  );
  const totalWeeklyCost = basketTotal(basket);
  const shoppingList = buildShoppingList(basket);
  const supermarketComparison = buildSupermarketPrices(
    days,
    preferences.householdSize,
    priceModel === "loyalty"
  );

  return {
    id: makeId(),
    createdAt: new Date().toISOString(),
    preferences,
    days,
    totalWeeklyCost,
    selectedStore,
    priceModel,
    basket,
    shoppingList,
    supermarketComparison,
    wasteReductionTips: [...WASTE_REDUCTION_TIPS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5),
  };
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
  const replacement =
    candidates[Math.floor(Math.random() * candidates.length)];

  const scaleFactor = plan.preferences.householdSize;
  const days = plan.days.map((day, di) => {
    if (di !== dayIndex) return day;
    const meals = day.meals.map((m, mi) =>
      mi === mealIndex ? replacement : m
    );
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

  return buildPlan(
    plan.preferences,
    days,
    plan.selectedStore,
    plan.priceModel
  );
}

export function generateWeeklyPlan(
  preferences: UserPreferences
): WeeklyPlan {
  const usedMeals = new Set<string>();

  const days: DayPlan[] = DAYS.map((day) => {
    const meals = selectMealsForDay(preferences, usedMeals);
    const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
    const totalCost =
      meals.reduce(
        (sum, meal) =>
          sum + meal.ingredients.reduce((s, i) => s + i.estimatedCost, 0),
        0
      ) * preferences.householdSize;

    return {
      day,
      meals,
      totalCalories,
      totalCost: Math.round(totalCost * 100) / 100,
    };
  });

  const { store } = cheapestStoreForPlan(
    days,
    preferences.householdSize,
    false
  );

  return buildPlan(preferences, days, store, "regular");
}
