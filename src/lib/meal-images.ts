const MEAL_IMAGE_BY_NAME: Record<string, string> = {
  "greek yogurt parfait": "/meal-parfait.jpg",
  "avocado toast with eggs": "/meal-avocado-toast.jpg",
  "overnight oats": "/meal-overnight-oats.jpg",
  "veggie egg scramble": "/meal-egg-scramble.jpg",
  "smoothie bowl": "/meal-smoothie-bowl.jpg",
  "chicken caesar salad": "/meal-caesar.jpg",
  "quinoa buddha bowl": "/meal-buddha-bowl.jpg",
  "turkey & veggie wrap": "/meal-wrap.jpg",
  "lentil soup": "/meal-lentil-soup.jpg",
  "mediterranean tuna salad": "/meal-tuna-salad.jpg",
  "grilled salmon with vegetables": "/meal-fish.jpg",
  "chicken stir-fry": "/meal-stirfry.jpg",
  "pasta primavera": "/meal-pasta-primavera.jpg",
  "black bean tacos": "/meal-tacos.jpg",
  "baked chicken thighs with roasted vegetables": "/meal-chicken.jpg",
  "apple with almond butter": "/meal-apple-snack.jpg",
  "trail mix": "/meal-trail-mix.jpg",
  "hummus & veggies": "/meal-hummus.jpg",
};

const KEYWORD_IMAGES: [string, string][] = [
  ["katsu", "/meal-katsu.jpg"],
  ["chilli", "/meal-chilli.jpg"],
  ["dahl", "/meal-dahl.jpg"],
  ["mushroom pasta", "/meal-mushroom-pasta.jpg"],
  ["parfait", "/meal-parfait.jpg"],
  ["oats", "/meal-overnight-oats.jpg"],
  ["smoothie", "/meal-smoothie-bowl.jpg"],
  ["caesar", "/meal-caesar.jpg"],
  ["wrap", "/meal-wrap.jpg"],
  ["taco", "/meal-tacos.jpg"],
  ["stir-fry", "/meal-stirfry.jpg"],
  ["tuna", "/meal-tuna-salad.jpg"],
  ["salmon", "/meal-fish.jpg"],
  ["fish", "/meal-fish.jpg"],
  ["steak", "/meal-beef.jpg"],
  ["beef", "/meal-beef.jpg"],
  ["tofu", "/meal-plant-based.jpg"],
  ["lentil", "/meal-lentil-soup.jpg"],
  ["curry", "/meal-vegetarian.jpg"],
  ["pasta", "/meal-quick.jpg"],
  ["quinoa", "/meal-buddha-bowl.jpg"],
  ["hummus", "/meal-hummus.jpg"],
  ["apple", "/meal-apple-snack.jpg"],
  ["egg", "/meal-egg-scramble.jpg"],
  ["chicken", "/meal-chicken.jpg"],
];

const MEAL_IMAGE_BY_TYPE: Record<string, string> = {
  breakfast: "/meal-breakfast.jpg",
  lunch: "/meal-vegetarian.jpg",
  dinner: "/meal-chicken.jpg",
  snack: "/meal-trail-mix.jpg",
};

export const SAMPLE_IMAGES = [
  "/meal-parfait.jpg",
  "/meal-caesar.jpg",
  "/meal-katsu.jpg",
  "/meal-apple-snack.jpg",
];

export function getMealImage(type: string, name?: string): string {
  if (name) {
    const key = name.toLowerCase();
    const exact = MEAL_IMAGE_BY_NAME[key];
    if (exact) return exact;
    for (const [keyword, image] of KEYWORD_IMAGES) {
      if (key.includes(keyword)) return image;
    }
  }
  return MEAL_IMAGE_BY_TYPE[type] ?? "/meal-chicken.jpg";
}
