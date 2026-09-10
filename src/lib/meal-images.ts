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
  // specific dishes first
  ["mushroom pasta", "/meal-mushroom-pasta.jpg"],
  ["spaghetti", "/meal-quick.jpg"],
  ["greek bowl", "/meal-greek-bowl.jpg"],
  ["greek chicken", "/meal-greek-bowl.jpg"],
  ["chicken katsu", "/meal-katsu.jpg"],
  ["chicken & rice", "/meal-greek-bowl.jpg"],
  ["prep box", "/meal-prepped.jpg"],
  ["prep", "/meal-prepped.jpg"],
  ["cauliflower curry", "/meal-vegetarian.jpg"],
  ["lentil dahl", "/meal-dahl.jpg"],
  ["dahl", "/meal-dahl.jpg"],
  ["salmon salad", "/meal-salmon-salad.jpg"],
  ["tuna salad", "/meal-tuna-salad.jpg"],
  ["chilli", "/meal-chilli.jpg"],
  // proteins
  ["steak", "/meal-beef.jpg"],
  ["beef", "/meal-beef.jpg"],
  ["bacon", "/meal-quick.jpg"],
  ["pork", "/meal-prepped.jpg"],
  ["salmon", "/meal-fish.jpg"],
  ["fish", "/meal-fish.jpg"],
  ["tuna", "/meal-tuna-salad.jpg"],
  ["chicken", "/meal-chicken.jpg"],
  ["tofu", "/meal-plant-based.jpg"],
  ["hummus", "/meal-hummus.jpg"],
  // bases / cuisines
  ["katsu", "/meal-katsu.jpg"],
  ["wrap", "/meal-wrap.jpg"],
  ["taco", "/meal-tacos.jpg"],
  ["stir-fry", "/meal-stirfry.jpg"],
  ["curry", "/meal-vegetarian.jpg"],
  ["pasta", "/meal-quick.jpg"],
  ["quinoa", "/meal-buddha-bowl.jpg"],
  ["lentil", "/meal-lentil-soup.jpg"],
  // meal types
  ["parfait", "/meal-parfait.jpg"],
  ["berry", "/meal-smoothie-bowl.jpg"],
  ["oats", "/meal-overnight-oats.jpg"],
  ["smoothie", "/meal-smoothie-bowl.jpg"],
  ["caesar", "/meal-caesar.jpg"],
  ["breakfast", "/meal-breakfast.jpg"],
  ["apple", "/meal-apple-snack.jpg"],
  ["egg", "/meal-egg-scramble.jpg"],
  ["veg", "/meal-plant-based.jpg"],
  ["rice", "/meal-glutenfree.jpg"],
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

/** Landing-page recipe card image resolver. */
export function getRecipeImage(name: string): string {
  return getMealImage("dinner", name);
}
