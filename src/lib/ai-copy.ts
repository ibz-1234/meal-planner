// Chef AI — a deterministic copywriting engine that turns a generated plan into
// personalised, appetite-driving descriptions. Runs fully client-side so it
// works with the static export; seeded so a plan always reads the same way.

import type { DayPlan, Meal, UserPreferences, WeeklyPlan } from "./types";

export interface MealCopy {
  headline: string;
  description: string;
  sellingPoints: string[];
}

export interface PlanNarrative {
  title: string;
  coachNote: string;
  whyItWorks: string[];
  premiumHook: string;
  projectedMonthlySaving: number;
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(seed: string, options: T[]): T {
  return options[hash(seed) % options.length];
}

const GOAL_VOICE: Record<string, { adjective: string; payoff: string; macro: string }> = {
  "Weight Loss": {
    adjective: "lean",
    payoff: "keeps you full for hours without the calorie hangover",
    macro: "protein",
  },
  "Muscle Gain": {
    adjective: "protein-packed",
    payoff: "feeds recovery so every session actually counts",
    macro: "protein",
  },
  "Maintain Weight": {
    adjective: "balanced",
    payoff: "keeps your energy steady from breakfast to bedtime",
    macro: "carbs",
  },
  "Heart Health": {
    adjective: "heart-smart",
    payoff: "loads you up on fibre and good fats your cardiologist would applaud",
    macro: "fat",
  },
  "Energy Boost": {
    adjective: "slow-burn",
    payoff: "ends the 3pm crash for good",
    macro: "carbs",
  },
  "General Wellness": {
    adjective: "feel-good",
    payoff: "gives your body what it has been asking for",
    macro: "protein",
  },
};

const TYPE_OPENERS: Record<Meal["type"], string[]> = {
  breakfast: [
    "Wake up to",
    "Start the day with",
    "Your morning gets",
    "Roll out of bed for",
  ],
  lunch: [
    "Midday, meet",
    "Lunch that beats the meal deal:",
    "Skip the queue for",
    "Your desk deserves",
  ],
  dinner: [
    "Tonight it's",
    "Dinner is",
    "End the day with",
    "On the table in minutes:",
  ],
  snack: [
    "Between meals, reach for",
    "A pocket-sized win:",
    "When the cravings hit,",
    "Bridge the gap with",
  ],
};

const TEXTURE_WORDS = [
  "golden",
  "crisp-edged",
  "silky",
  "smoky",
  "zesty",
  "buttery",
  "fragrant",
  "hearty",
  "bright",
  "caramelised",
];

const CLOSERS = [
  "You will wonder why you ever ordered takeaway.",
  "Restaurant flavour, corner-shop price.",
  "Leftovers optional — there rarely are any.",
  "The kind of plate people photograph before eating.",
  "Comfort food that still fits the plan.",
  "Tastes indulgent. Costs pennies.",
];

function heroIngredients(meal: Meal): string[] {
  return [...meal.ingredients]
    .sort((a, b) => b.estimatedCost - a.estimatedCost)
    .slice(0, 3)
    .map((i) => i.name.toLowerCase());
}

function joinNatural(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function describeMeal(meal: Meal, prefs: UserPreferences): MealCopy {
  const seed = `${meal.name}|${prefs.fitnessGoal}`;
  const voice = GOAL_VOICE[prefs.fitnessGoal] ?? GOAL_VOICE["General Wellness"];
  const heroes = heroIngredients(meal);
  const texture = pick(seed + "t", TEXTURE_WORDS);
  const opener = pick(seed + "o", TYPE_OPENERS[meal.type]);
  const closer = pick(seed + "c", CLOSERS);
  const cost = meal.ingredients.reduce((s, i) => s + i.estimatedCost, 0);

  const headline = pick(seed + "h", [
    `${texture.charAt(0).toUpperCase() + texture.slice(1)} ${meal.name.toLowerCase()}`,
    `${meal.name}, the ${voice.adjective} way`,
    `${meal.prepTime}-minute ${meal.name.toLowerCase()}`,
  ]);

  const description = `${opener} ${texture} ${meal.name.toLowerCase()} built around ${joinNatural(
    heroes
  )}. Ready in ${meal.prepTime} minutes, it ${voice.payoff}. ${closer}`;

  const sellingPoints = [
    `${meal.protein}g protein · ${meal.calories} kcal`,
    meal.prepTime <= 15
      ? `Faster than a delivery app — ${meal.prepTime} min`
      : `${meal.prepTime} min hands-on, mostly walk-away time`,
    `About ${Math.round(cost * 100) / 100 < 3 ? "a third" : "half"} the price of the same dish eaten out`,
  ];

  return { headline, description, sellingPoints };
}

const TAKEAWAY_PER_MEAL_GBP = 9.5;

export function describePlan(plan: WeeklyPlan): PlanNarrative {
  const prefs = plan.preferences;
  const voice = GOAL_VOICE[prefs.fitnessGoal] ?? GOAL_VOICE["General Wellness"];
  const seed = plan.id;
  const mealCount = plan.days.reduce((s, d) => s + d.meals.length, 0);
  const avgCalories = Math.round(
    plan.days.reduce((s, d) => s + d.totalCalories, 0) / plan.days.length
  );
  const totalPrep = plan.days.reduce(
    (s, d) => s + d.meals.reduce((m, x) => m + x.prepTime, 0),
    0
  );
  const householdWord =
    prefs.householdSize === 1
      ? "just for you"
      : `for ${prefs.householdSize} people`;
  const restrictions =
    prefs.dietaryRestrictions.length > 0
      ? `${prefs.dietaryRestrictions.join(", ").toLowerCase()} from start to finish`
      : "no compromises on flavour";

  const dinners = plan.days
    .map((d) => d.meals.find((m) => m.type === "dinner")?.name)
    .filter((n): n is string => Boolean(n));

  const mainMeals = plan.days.reduce(
    (s, d) => s + d.meals.filter((m) => m.type === "lunch" || m.type === "dinner").length,
    0
  );
  const projectedMonthlySaving = Math.max(
    0,
    Math.round((mainMeals * TAKEAWAY_PER_MEAL_GBP - plan.totalWeeklyCost) * 4.33)
  );

  return {
    title: pick(seed + "title", [
      `Your ${voice.adjective} week, ${householdWord}`,
      `Seven days. ${mealCount} meals. Zero decisions.`,
      `The ${prefs.fitnessGoal.toLowerCase()} week that tastes like a treat`,
    ]),
    coachNote: `Chef AI read your brief — ${prefs.fitnessGoal.toLowerCase()}, ${
      prefs.cookingSkill
    } in the kitchen, ${restrictions} — and built ${mealCount} meals around roughly ${avgCalories} kcal a day. Expect ${
      dinners[0]?.toLowerCase() ?? "big flavours"
    } to open the week and ${
      dinners[dinners.length - 1]?.toLowerCase() ?? "a Sunday feast"
    } to close it. Total hands-on time: about ${Math.round(totalPrep / 60)} hours across the whole week.`,
    whyItWorks: [
      `Every meal is weighted towards ${voice.macro}, the lever that matters most for ${prefs.fitnessGoal.toLowerCase()}.`,
      `Ingredients repeat on purpose — one bag of spinach works three shifts, so nothing rots in the drawer.`,
      `Nothing takes longer than ${Math.max(...plan.days.flatMap((d) => d.meals.map((m) => m.prepTime)))} minutes, matched to a ${prefs.cookingSkill} cook.`,
    ],
    premiumHook: pick(seed + "hook", [
      `Premium members get this plan re-written every Monday as prices shift — Chef AI already found a version about ${
        12 + (hash(seed) % 9)
      }% cheaper at a different store.`,
      `Unlock the full seven days plus a four-week progression that adjusts portions as your goal moves.`,
      `Your taste profile is 40% learned. Premium finishes the job with weekly swaps you will actually want to eat.`,
    ]),
    projectedMonthlySaving,
  };
}

export const FREE_DAYS_UNLOCKED = 2;

export function isDayLocked(dayIndex: number, premium: boolean): boolean {
  return !premium && dayIndex >= FREE_DAYS_UNLOCKED;
}

export function dayTeaser(day: DayPlan, prefs: UserPreferences): string {
  const dinner = day.meals.find((m) => m.type === "dinner") ?? day.meals[0];
  const copy = describeMeal(dinner, prefs);
  return `${day.day}: ${copy.headline}. ${copy.description.split(". ")[0]}.`;
}
