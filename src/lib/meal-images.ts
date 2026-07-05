export const MEAL_IMAGE_BY_TYPE: Record<string, string> = {
  breakfast: "/meal-breakfast.jpg",
  lunch: "/meal-vegetarian.jpg",
  dinner: "/meal-chicken.jpg",
  snack: "/meal-breakfast.jpg",
};

export const SAMPLE_IMAGES = [
  "/meal-breakfast.jpg",
  "/meal-chicken.jpg",
  "/meal-vegetarian.jpg",
  "/meal-plant-based.jpg",
];

export function getMealImage(type: string): string {
  return MEAL_IMAGE_BY_TYPE[type] ?? "/meal-chicken.jpg";
}
