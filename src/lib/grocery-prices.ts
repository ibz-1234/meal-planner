// Per-supermarket UK ingredient price table (GBP), benchmarked against
// PriceRunner listings and each chain's online shop. Prices are per pack;
// baskets are costed by scaling each ingredient's average cost by the
// selected store's price relative to the six-store average.
// Refreshed manually — last update noted below.

export const UK_PRICE_TABLE_UPDATED = "2026-07-01";

export const UK_STORES = [
  "Tesco",
  "Aldi",
  "Lidl",
  "Asda",
  "Morrisons",
  "Sainsbury's",
] as const;

export type UKStore = (typeof UK_STORES)[number];

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
};

// Fallback relative index for ingredients not in the table
const STORE_FALLBACK_INDEX: Record<UKStore, number> = {
  Tesco: 1.0,
  Aldi: 0.84,
  Lidl: 0.86,
  Asda: 0.93,
  Morrisons: 0.96,
  "Sainsbury's": 1.06,
};

function storeIdx(store: UKStore): number {
  return UK_STORES.indexOf(store);
}

/** How this store's price for an ingredient compares to the six-store average (1 = average). */
export function ingredientStoreFactor(name: string, store: UKStore): number {
  const entry = UK_PRICE_TABLE[name];
  if (!entry) return STORE_FALLBACK_INDEX[store] / 0.94; // 0.94 ≈ avg of fallback indices
  const avg = entry.prices.reduce((s, p) => s + p, 0) / entry.prices.length;
  return entry.prices[storeIdx(store)] / avg;
}

export function ingredientPackPrice(
  name: string
): { pack: string; prices: Record<UKStore, number> } | null {
  const entry = UK_PRICE_TABLE[name];
  if (!entry) return null;
  return {
    pack: entry.pack,
    prices: Object.fromEntries(
      UK_STORES.map((s) => [s, entry.prices[storeIdx(s)]])
    ) as Record<UKStore, number>,
  };
}

export interface BasketItem {
  ingredient: string;
  estimatedCost: number; // average-price GBP cost for the quantity used
}

/** Cost of the basket if every item were bought at the given store. */
export function basketCostAtStore(items: BasketItem[], store: UKStore): number {
  const total = items.reduce(
    (sum, item) =>
      sum + item.estimatedCost * ingredientStoreFactor(item.ingredient, store),
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
