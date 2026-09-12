export type UKStore =
  | "Tesco"
  | "Aldi"
  | "Lidl"
  | "Asda"
  | "Morrisons"
  | "Sainsbury's";

export interface UserPreferences {
  budget: number;
  budgetPeriod: "weekly" | "monthly";
  fitnessGoal: string;
  dietaryRestrictions: string[];
  allergies: string[];
  householdSize: number;
  cookingSkill: "beginner" | "intermediate" | "advanced";
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
  estimatedCost: number;
  category: string;
  affiliateUrl?: string;
}

export interface Meal {
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  ingredients: Ingredient[];
  instructions: string[];
  wasteReductionTip?: string;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
  totalCalories: number;
  totalCost: number;
}

export interface Product {
  id: string;
  ingredient: string;
  supermarket: UKStore;
  productName: string;
  brand?: string;
  category: string;
  packSize: string;
  packAmount: number;
  unit: "g" | "ml" | "item";
  price: number;
  loyaltyPrice?: number;
  pricePerUnit: number;
  lastUpdated: string;
  productUrl?: string;
}

export interface BasketProduct {
  product: Product;
  ingredient: string;
  packsNeeded: number;
  totalUsed: number;
  leftover: number;
  totalPrice: number;
  displayUnit: "g" | "ml" | "item";
  perMealAmount: number; // amount used by one meal for the whole household
}

export interface WeeklyPlan {
  id: string;
  createdAt: string;
  preferences: UserPreferences;
  days: DayPlan[];
  totalWeeklyCost: number;
  selectedStore: UKStore;
  priceModel: "regular" | "loyalty";
  basket: BasketProduct[];
  shoppingList: ShoppingListItem[];
  supermarketComparison: SupermarketPrice[];
  wasteReductionTips: string[];
}

export interface ShoppingListItem {
  ingredient: string;
  totalQuantity: string;
  unit: string;
  category: string;
  estimatedCost: number;
  checked: boolean;
}

export interface SupermarketPrice {
  store: string;
  totalEstimatedCost: number;
  savings: number;
  logo: string;
  affiliateUrl: string;
}
