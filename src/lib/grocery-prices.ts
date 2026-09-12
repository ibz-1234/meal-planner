// Product-level UK supermarket price catalog. Each ingredient maps to one
// own-brand product per store with pack size, regular price and a loyalty
// price where that store runs a loyalty scheme. Baskets are calculated by
// buying whole packs and carrying leftover portions across the week.
// These prices are curated static estimates, not live feeds.

import type { UKStore, Product, BasketProduct, DayPlan } from "./types";

export const UK_PRICE_TABLE_UPDATED = "2026-09-11";

export const UK_STORES: UKStore[] = [
  "Tesco",
  "Aldi",
  "Lidl",
  "Asda",
  "Morrisons",
  "Sainsbury's",
];

const LOYALTY_STORES = new Set<UKStore>(["Tesco", "Sainsbury's"]);

const STORE_PREFIX: Record<UKStore, string> = {
  Tesco: "Tesco",
  Aldi: "Aldi Everyday Essentials",
  Lidl: "Lidl Deluxe",
  Asda: "Asda Just Essentials",
  Morrisons: "Morrisons Savers",
  "Sainsbury's": "Sainsbury's",
};

export interface IngredientPrice {
  pack: string;
  // [Tesco, Aldi, Lidl, Asda, Morrisons, Sainsbury's]
  prices: [number, number, number, number, number, number];
}

export const UK_PRICE_TABLE: Record<string, IngredientPrice> = {
  "Chicken Breast": { pack: "500g", prices: [4.25, 3.99, 3.89, 4.1, 4.15, 4.3] },
  "Chicken Thighs": { pack: "1kg", prices: [3.49, 3.19, 3.15, 3.35, 3.45, 3.6] },
  "Salmon Fillet": { pack: "2x 120g", prices: [3.95, 3.49, 3.55, 3.75, 3.9, 4.1] },
  "Canned Tuna": { pack: "4x 145g", prices: [3.6, 3.15, 3.19, 3.4, 3.5, 3.75] },
  "Turkey Slices": { pack: "125g", prices: [2.1, 1.79, 1.85, 1.95, 2.0, 2.25] },
  Eggs: { pack: "12 medium", prices: [3.2, 2.85, 2.75, 3.1, 3.15, 3.25] },
  Milk: { pack: "2L", prices: [1.75, 1.65, 1.69, 1.79, 1.75, 1.8] },
  "Greek Yogurt": { pack: "500g", prices: [1.85, 1.49, 1.55, 1.7, 1.8, 1.95] },
  "Parmesan Cheese": { pack: "200g", prices: [2.8, 2.35, 2.39, 2.6, 2.75, 2.95] },
  "Almond Milk": { pack: "1L", prices: [1.4, 1.09, 1.15, 1.3, 1.35, 1.5] },
  "Whole Wheat Bread": { pack: "800g loaf", prices: [1.35, 1.09, 1.15, 1.25, 1.3, 1.45] },
  "Whole Wheat Pasta": { pack: "500g", prices: [0.95, 0.75, 0.79, 0.85, 0.9, 1.0] },
  "Whole Wheat Tortilla": { pack: "8 pack", prices: [1.5, 1.19, 1.25, 1.4, 1.45, 1.55] },
  "Corn Tortillas": { pack: "8 pack", prices: [1.6, 1.29, 1.35, 1.5, 1.55, 1.7] },
  "Brown Rice": { pack: "1kg", prices: [1.65, 1.35, 1.39, 1.55, 1.6, 1.75] },
  "Jasmine Rice": { pack: "1kg", prices: [1.95, 1.59, 1.65, 1.8, 1.9, 2.1] },
  Quinoa: { pack: "300g", prices: [1.85, 1.49, 1.55, 1.7, 1.8, 2.0] },
  "Rolled Oats": { pack: "1kg", prices: [1.3, 0.99, 1.05, 1.2, 1.25, 1.4] },
  Granola: { pack: "500g", prices: [2.1, 1.69, 1.75, 1.95, 2.0, 2.25] },
  "Red Lentils": { pack: "500g", prices: [1.25, 0.99, 1.05, 1.15, 1.2, 1.35] },
  Chickpeas: { pack: "400g tin", prices: [0.6, 0.45, 0.47, 0.55, 0.58, 0.65] },
  "Black Beans": { pack: "400g tin", prices: [0.75, 0.59, 0.62, 0.7, 0.72, 0.8] },
  Avocado: { pack: "each", prices: [0.85, 0.69, 0.72, 0.79, 0.82, 0.9] },
  Banana: { pack: "5 pack", prices: [0.9, 0.78, 0.79, 0.85, 0.88, 0.95] },
  "Frozen Banana": { pack: "500g", prices: [1.5, 1.25, 1.29, 1.4, 1.45, 1.6] },
  Apple: { pack: "6 pack", prices: [1.6, 1.35, 1.39, 1.5, 1.55, 1.7] },
  Lemon: { pack: "each", prices: [0.3, 0.24, 0.25, 0.28, 0.29, 0.32] },
  Lime: { pack: "each", prices: [0.3, 0.24, 0.25, 0.28, 0.29, 0.32] },
  "Lemon Juice": { pack: "250ml", prices: [0.7, 0.55, 0.58, 0.65, 0.68, 0.75] },
  "Mixed Berries": { pack: "400g frozen", prices: [2.5, 2.09, 2.15, 2.35, 2.45, 2.65] },
  "Frozen Berries": { pack: "400g", prices: [2.5, 2.09, 2.15, 2.35, 2.45, 2.65] },
  "Dried Fruit": { pack: "250g", prices: [1.75, 1.45, 1.49, 1.65, 1.7, 1.85] },
  Broccoli: { pack: "each", prices: [0.85, 0.69, 0.72, 0.79, 0.82, 0.9] },
  Spinach: { pack: "240g bag", prices: [1.3, 1.05, 1.09, 1.2, 1.25, 1.4] },
  Kale: { pack: "200g bag", prices: [1.1, 0.89, 0.92, 1.0, 1.05, 1.2] },
  "Mixed Greens": { pack: "150g bag", prices: [1.2, 0.95, 0.99, 1.1, 1.15, 1.3] },
  "Romaine Lettuce": { pack: "2 pack", prices: [1.25, 1.0, 1.05, 1.15, 1.2, 1.35] },
  "Cherry Tomatoes": { pack: "330g", prices: [1.1, 0.89, 0.92, 1.0, 1.05, 1.2] },
  Tomato: { pack: "6 pack", prices: [1.0, 0.82, 0.85, 0.92, 0.95, 1.1] },
  Cucumber: { pack: "each", prices: [0.75, 0.62, 0.65, 0.7, 0.72, 0.8] },
  "Bell Pepper": { pack: "3 pack", prices: [1.55, 1.25, 1.29, 1.45, 1.5, 1.65] },
  Carrots: { pack: "1kg", prices: [0.65, 0.5, 0.52, 0.6, 0.62, 0.7] },
  "Carrot Sticks": { pack: "300g", prices: [0.85, 0.69, 0.72, 0.79, 0.82, 0.9] },
  "Celery Sticks": { pack: "each", prices: [0.85, 0.69, 0.72, 0.79, 0.82, 0.9] },
  Onion: { pack: "1kg", prices: [0.95, 0.79, 0.82, 0.89, 0.92, 1.0] },
  Garlic: { pack: "4 bulbs", prices: [0.9, 0.75, 0.78, 0.85, 0.88, 0.95] },
  Zucchini: { pack: "each", prices: [0.7, 0.55, 0.58, 0.65, 0.68, 0.75] },
  "Sweet Potato": { pack: "1kg", prices: [1.15, 0.95, 0.98, 1.05, 1.1, 1.25] },
  Potatoes: { pack: "2.5kg", prices: [1.8, 1.49, 1.55, 1.7, 1.75, 1.95] },
  "Mixed Stir-Fry Vegetables": { pack: "600g", prices: [1.7, 1.39, 1.45, 1.6, 1.65, 1.8] },
  Cilantro: { pack: "30g", prices: [0.55, 0.47, 0.49, 0.52, 0.53, 0.6] },
  "Herbs (Thyme, Rosemary)": { pack: "pot each", prices: [1.4, 1.15, 1.19, 1.3, 1.35, 1.5] },
  "Kalamata Olives": { pack: "160g", prices: [1.7, 1.39, 1.45, 1.6, 1.65, 1.85] },
  Hummus: { pack: "200g", prices: [1.15, 0.89, 0.95, 1.05, 1.1, 1.25] },
  Salsa: { pack: "300g jar", prices: [1.4, 1.15, 1.19, 1.3, 1.35, 1.5] },
  "Caesar Dressing": { pack: "250ml", prices: [1.5, 1.19, 1.25, 1.4, 1.45, 1.6] },
  Croutons: { pack: "150g", prices: [1.0, 0.79, 0.85, 0.92, 0.95, 1.1] },
  "Olive Oil": { pack: "500ml", prices: [4.5, 3.79, 3.85, 4.25, 4.4, 4.75] },
  "Sesame Oil": { pack: "250ml", prices: [2.3, 1.95, 1.99, 2.15, 2.25, 2.45] },
  "Soy Sauce": { pack: "150ml", prices: [1.2, 0.95, 0.99, 1.1, 1.15, 1.3] },
  Honey: { pack: "340g", prices: [1.7, 1.39, 1.45, 1.6, 1.65, 1.8] },
  "Peanut Butter": { pack: "340g", prices: [1.9, 1.55, 1.59, 1.75, 1.85, 2.05] },
  "Almond Butter": { pack: "170g", prices: [2.6, 2.19, 2.25, 2.45, 2.55, 2.8] },
  Tahini: { pack: "300g", prices: [2.5, 2.09, 2.15, 2.35, 2.45, 2.7] },
  "Chia Seeds": { pack: "150g", prices: [1.85, 1.55, 1.59, 1.75, 1.8, 2.0] },
  "Mixed Nuts": { pack: "200g", prices: [2.4, 1.99, 2.05, 2.25, 2.35, 2.6] },
  Cumin: { pack: "43g jar", prices: [1.0, 0.79, 0.85, 0.92, 0.95, 1.1] },
  "Salt & Pepper": { pack: "set", prices: [1.2, 0.95, 0.99, 1.1, 1.15, 1.3] },
  "Vegetable Broth": { pack: "1L", prices: [1.1, 0.89, 0.92, 1.0, 1.05, 1.2] },
  "Miso Paste": { pack: "200g", prices: [2.5, 1.99, 2.05, 2.25, 2.35, 2.6] },
  "Ginger": { pack: "100g", prices: [0.75, 0.55, 0.58, 0.65, 0.68, 0.75] },
  "Chilli Flakes": { pack: "40g", prices: [1.2, 0.95, 0.99, 1.05, 1.1, 1.25] },
};

// Typical fraction of a pack used per person in one meal.
export const PORTION_OF_PACK: Record<string, number> = {
  "Chicken Breast": 0.35,
  "Chicken Thighs": 0.25,
  "Salmon Fillet": 0.5,
  "Canned Tuna": 0.25,
  "Turkey Slices": 0.8,
  Eggs: 0.17,
  Milk: 0.13,
  "Greek Yogurt": 0.25,
  "Parmesan Cheese": 0.15,
  "Almond Milk": 0.25,
  "Whole Wheat Bread": 0.1,
  "Whole Wheat Pasta": 0.35,
  "Whole Wheat Tortilla": 0.25,
  "Corn Tortillas": 0.38,
  "Brown Rice": 0.19,
  "Jasmine Rice": 0.19,
  Quinoa: 0.28,
  "Rolled Oats": 0.05,
  Granola: 0.12,
  "Red Lentils": 0.4,
  Chickpeas: 1.0,
  "Black Beans": 1.0,
  Avocado: 0.5,
  Banana: 0.2,
  "Frozen Banana": 0.25,
  Apple: 0.17,
  Lemon: 1.0,
  Lime: 1.0,
  "Lemon Juice": 0.15,
  "Mixed Berries": 0.25,
  "Frozen Berries": 0.25,
  "Dried Fruit": 0.15,
  Broccoli: 0.5,
  Spinach: 0.4,
  Kale: 0.5,
  "Mixed Greens": 0.7,
  "Romaine Lettuce": 0.5,
  "Cherry Tomatoes": 0.5,
  Tomato: 0.33,
  Cucumber: 0.5,
  "Bell Pepper": 0.33,
  Carrots: 0.15,
  "Carrot Sticks": 0.5,
  "Celery Sticks": 0.3,
  Onion: 0.12,
  Garlic: 0.12,
  Zucchini: 1.0,
  "Sweet Potato": 0.3,
  Potatoes: 0.15,
  "Mixed Stir-Fry Vegetables": 0.5,
  Cilantro: 0.5,
  "Herbs (Thyme, Rosemary)": 0.3,
  "Kalamata Olives": 0.5,
  Hummus: 0.5,
  Salsa: 0.4,
  "Caesar Dressing": 0.2,
  Croutons: 0.3,
  "Olive Oil": 0.05,
  "Sesame Oil": 0.06,
  "Soy Sauce": 0.1,
  Honey: 0.06,
  "Peanut Butter": 0.09,
  "Almond Butter": 0.15,
  Tahini: 0.1,
  "Chia Seeds": 0.12,
  "Mixed Nuts": 0.2,
  Cumin: 0.08,
  "Salt & Pepper": 0.02,
  "Vegetable Broth": 0.5,
  "Miso Paste": 0.15,
  "Ginger": 0.2,
  "Chilli Flakes": 0.05,
};

const PORTION_BY_LOWER = new Map(
  Object.entries(PORTION_OF_PACK).map(([k, v]) => [k.toLowerCase(), v])
);

function parsePack(pack: string): { amount: number; unit: "g" | "ml" | "item" } {
  const lower = pack.toLowerCase().replace(/,/g, "");

  const multi = lower.match(
    /^(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*(g|ml|kg|litres?|liters?|l)\b/
  );
  if (multi) {
    const multiplier = Number(multi[1]);
    const base = Number(multi[2]);
    const suffix = multi[3];
    const total = multiplier * base;
    if (suffix === "kg") return { amount: total * 1000, unit: "g" };
    if (suffix.startsWith("l")) return { amount: total * 1000, unit: "ml" };
    return { amount: total, unit: suffix as "g" | "ml" };
  }

  const single = lower.match(
    /(\d+(?:\.\d+)?)\s*(g|ml|kg|litres?|liters?|l)\b/
  );
  if (single) {
    const value = Number(single[1]);
    const suffix = single[2];
    if (suffix === "kg") return { amount: value * 1000, unit: "g" };
    if (suffix.startsWith("l")) return { amount: value * 1000, unit: "ml" };
    return { amount: value, unit: suffix as "g" | "ml" };
  }

  const count = lower.match(/(\d+)\s*(pack|medium|large|small|bulbs|pieces|pcs)\b/);
  if (count) {
    return { amount: Number(count[1]), unit: "item" };
  }

  if (/\beach\b|\bset\b|\bpot each\b/.test(lower)) {
    return { amount: 1, unit: "item" };
  }

  return { amount: 1, unit: "item" };
}

function productCategory(name: string): string {
  const n = name.toLowerCase();
  if (
    ["chicken", "salmon", "tuna", "turkey", "beef", "pork", "fish"].some((m) =>
      n.includes(m)
    )
  )
    return "Meat & Fish";
  if (["milk", "yogurt", "cheese", "eggs", "butter", "cream"].some((d) => n.includes(d)))
    return "Dairy & Eggs";
  if (
    ["bread", "pasta", "tortilla", "oats", "rice", "quinoa", "granola", "croutons"].some(
      (g) => n.includes(g)
    )
  )
    return "Bakery & Grains";
  if (
    [
      "oil",
      "sauce",
      "honey",
      "seeds",
      "nuts",
      "cumin",
      "salt",
      "broth",
      "tahini",
      "peanut butter",
      "almond butter",
      "dressing",
      "hummus",
      "salsa",
      "olives",
      "dried fruit",
      "lemon juice",
    ].some((p) => n.includes(p))
  )
    return "Pantry";
  return "Produce";
}

function pricePerUnit(price: number, amount: number, unit: "g" | "ml" | "item"): number {
  if (amount === 0) return price;
  if (unit === "item") return Math.round((price / amount) * 100) / 100;
  // price per 100 g / 100 ml
  return Math.round((price / amount) * 100 * 100) / 100;
}

function loyaltyPriceFor(store: UKStore, price: number): number | undefined {
  if (!LOYALTY_STORES.has(store)) return undefined;
  return Math.round(price * 0.85 * 100) / 100;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const PRODUCT_CATALOG_BY_LOWER = new Map<string, Record<UKStore, Product>>();

function buildProductCatalog() {
  for (const [ingredient, entry] of Object.entries(UK_PRICE_TABLE)) {
    const byStore = {} as Record<UKStore, Product>;
    for (const store of UK_STORES) {
      const idx = UK_STORES.indexOf(store);
      const price = entry.prices[idx];
      const parsed = parsePack(entry.pack);
      const productName = `${STORE_PREFIX[store]} ${ingredient} ${entry.pack}`.replace(/\s+/g, " ");
      const loyalty = loyaltyPriceFor(store, price);
      const product: Product = {
        id: `${slugify(store)}-${slugify(ingredient)}`,
        ingredient,
        supermarket: store,
        productName,
        category: productCategory(ingredient),
        packSize: entry.pack,
        packAmount: parsed.amount,
        unit: parsed.unit,
        price,
        loyaltyPrice: loyalty,
        pricePerUnit: pricePerUnit(price, parsed.amount, parsed.unit),
        lastUpdated: UK_PRICE_TABLE_UPDATED,
      };
      byStore[store] = product;
    }
    PRODUCT_CATALOG_BY_LOWER.set(ingredient.toLowerCase(), byStore);
  }
}
buildProductCatalog();

export function storeHasLoyalty(store: UKStore): boolean {
  return LOYALTY_STORES.has(store);
}

export function getProduct(
  ingredientName: string,
  store: UKStore
): Product | null {
  const byStore = PRODUCT_CATALOG_BY_LOWER.get(ingredientName.toLowerCase());
  return byStore?.[store] ?? null;
}

export function getIngredientFraction(ingredientName: string): number {
  return (
    PORTION_OF_PACK[ingredientName] ??
    PORTION_BY_LOWER.get(ingredientName.toLowerCase()) ??
    0
  );
}

export function productPrice(product: Product, useLoyalty: boolean): number {
  if (useLoyalty && product.loyaltyPrice !== undefined) return product.loyaltyPrice;
  return product.price;
}

export function formatProductAmount(
  amount: number,
  unit: "g" | "ml" | "item"
): string {
  if (unit === "item") return `${Math.round(amount)}`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}${unit === "g" ? "kg" : "L"}`;
  return `${Math.round(amount)}${unit}`;
}

/** Per-serving cost of one ingredient at a given store (pack price × portion used). */
export function ingredientServingCostGBP(
  name: string,
  fallbackCost: number,
  store: UKStore
): number {
  const product = getProduct(name, store);
  const fraction = getIngredientFraction(name);
  if (!product || fraction === 0) return fallbackCost;
  return Math.round(product.price * fraction * 100) / 100;
}

/** Per-serving recipe cost built from real pack prices at a given store. */
export function recipeServingCostGBP(
  meal: { ingredients: { name: string; estimatedCost: number }[] },
  store: UKStore = "Aldi"
): number {
  const total = meal.ingredients.reduce(
    (sum, ing) => sum + ingredientServingCostGBP(ing.name, ing.estimatedCost, store),
    0
  );
  return Math.round(total * 100) / 100;
}

/** Per-use cost (six-store average price × typical portion of pack), GBP. */
export function portionCostGBP(name: string): number | null {
  const byStore = PRODUCT_CATALOG_BY_LOWER.get(name.toLowerCase());
  const fraction = getIngredientFraction(name);
  if (!byStore || fraction === 0) return null;
  const avg =
    UK_STORES.reduce((sum, store) => sum + byStore[store].price, 0) /
    UK_STORES.length;
  return Math.round(avg * fraction * 100) / 100;
}

export interface BasketItem {
  ingredient: string;
  estimatedCost: number;
}

export function calculatePlanBasket(
  days: DayPlan[],
  householdSize: number,
  store: UKStore,
  useLoyalty = false
): BasketProduct[] {
  const usage = new Map<string, number>();
  const perMeal = new Map<string, number>();

  for (const day of days) {
    for (const meal of day.meals) {
      for (const ingredient of meal.ingredients) {
        const fraction = getIngredientFraction(ingredient.name);
        perMeal.set(ingredient.name, fraction);
        usage.set(
          ingredient.name,
          (usage.get(ingredient.name) ?? 0) + fraction * householdSize
        );
      }
    }
  }

  const products: BasketProduct[] = [];
  for (const [ingredient, totalFraction] of usage) {
    const product = getProduct(ingredient, store);
    if (!product) continue;

    const packPrice = productPrice(product, useLoyalty);
    const packsNeeded = Math.max(1, Math.ceil(totalFraction));
    const totalUsed = totalFraction * product.packAmount;
    const leftover = packsNeeded * product.packAmount - totalUsed;
    const perMealFraction = perMeal.get(ingredient) ?? 0;

    products.push({
      product,
      ingredient,
      packsNeeded,
      totalUsed,
      leftover,
      totalPrice: Math.round(packPrice * packsNeeded * 100) / 100,
      displayUnit: product.unit,
      perMealAmount: product.packAmount * perMealFraction * householdSize,
    });
  }

  return products.sort((a, b) =>
    a.product.category.localeCompare(b.product.category)
  );
}

export function basketTotal(basket: BasketProduct[]): number {
  return Math.round(basket.reduce((sum, item) => sum + item.totalPrice, 0) * 100) / 100;
}

export interface StoreBasketTotal {
  store: UKStore;
  total: number;
  isCheapest: boolean;
}

export function comparePlanStores(
  days: DayPlan[],
  householdSize: number,
  useLoyalty = false
): StoreBasketTotal[] {
  const totals = UK_STORES.map((store) => ({
    store,
    total: basketTotal(calculatePlanBasket(days, householdSize, store, useLoyalty)),
  }));
  totals.sort((a, b) => a.total - b.total);
  const cheapest = totals[0]?.total ?? 0;
  return totals.map((t) => ({
    ...t,
    isCheapest: t.total === cheapest,
  }));
}

export function cheapestStoreForPlan(
  days: DayPlan[],
  householdSize: number,
  useLoyalty = false
): { store: UKStore; total: number } {
  const sorted = comparePlanStores(days, householdSize, useLoyalty);
  return sorted[0] ?? { store: "Aldi", total: 0 };
}

// Legacy helpers kept for compatibility with older components.
export function ingredientStoreFactor(name: string, store: UKStore): number {
  const byStore = PRODUCT_CATALOG_BY_LOWER.get(name.toLowerCase());
  if (!byStore) return 1;
  const avg =
    UK_STORES.reduce((sum, s) => sum + byStore[s].price, 0) / UK_STORES.length;
  return byStore[store].price / avg;
}

export function ingredientPackPrice(
  name: string
): { pack: string; prices: Record<UKStore, number> } | null {
  const byStore = PRODUCT_CATALOG_BY_LOWER.get(name.toLowerCase());
  if (!byStore) return null;
  return {
    pack: byStore["Tesco"].packSize,
    prices: Object.fromEntries(
      UK_STORES.map((s) => [s, byStore[s].price])
    ) as Record<UKStore, number>,
  };
}

export function basketCostAtStore(items: BasketItem[], store: UKStore): number {
  const total = items.reduce(
    (sum, item) => sum + item.estimatedCost * ingredientStoreFactor(item.ingredient, store),
    0
  );
  return Math.round(total * 100) / 100;
}

export interface UKStoreComparison {
  store: UKStore;
  costGBP: number;
  isCheapest: boolean;
  savingVsDearestGBP: number;
}

export function compareUKBasket(items: BasketItem[]): UKStoreComparison[] {
  const costs = UK_STORES.map((store) => ({
    store,
    costGBP: basketCostAtStore(items, store),
  }));
  const sorted = [...costs].sort((a, b) => a.costGBP - b.costGBP);
  const dearest = sorted[sorted.length - 1].costGBP;
  return sorted.map((c, i) => ({
    ...c,
    isCheapest: i === 0,
    savingVsDearestGBP: Math.round((dearest - c.costGBP) * 100) / 100,
  }));
}
