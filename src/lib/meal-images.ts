const MEAL_IMAGE_BY_NAME: Record<string, string> = {
  "greek yogurt parfait": "/meal-parfait.webp",
  "avocado toast with eggs": "/meal-avocado-toast.webp",
  "overnight oats": "/meal-overnight-oats.webp",
  "veggie egg scramble": "/meal-egg-scramble.webp",
  "smoothie bowl": "/meal-smoothie-bowl.webp",
  "chicken caesar salad": "/meal-caesar.webp",
  "quinoa buddha bowl": "/meal-buddha-bowl.webp",
  "turkey & veggie wrap": "/meal-wrap.webp",
  "lentil soup": "/meal-lentil-soup.webp",
  "mediterranean tuna salad": "/meal-tuna-salad.webp",
  "grilled salmon with vegetables": "/meal-fish.webp",
  "chicken stir-fry": "/meal-stirfry.webp",
  "pasta primavera": "/meal-pasta-primavera.webp",
  "black bean tacos": "/meal-tacos.webp",
  "baked chicken thighs with roasted vegetables": "/meal-chicken.webp",
  "apple with almond butter": "/meal-apple-snack.webp",
  "trail mix": "/meal-trail-mix.webp",
  "hummus & veggies": "/meal-hummus.webp",
};

const KEYWORD_IMAGES: [string, string][] = [
  ["katsu", "/meal-katsu.webp"],
  ["chilli", "/meal-chilli.webp"],
  ["dahl", "/meal-dahl.webp"],
  ["mushroom pasta", "/meal-mushroom-pasta.webp"],
  ["parfait", "/meal-parfait.webp"],
  ["oats", "/meal-overnight-oats.webp"],
  ["smoothie", "/meal-smoothie-bowl.webp"],
  ["caesar", "/meal-caesar.webp"],
  ["wrap", "/meal-wrap.webp"],
  ["taco", "/meal-tacos.webp"],
  ["stir-fry", "/meal-stirfry.webp"],
  ["tuna", "/meal-tuna-salad.webp"],
  ["salmon", "/meal-fish.webp"],
  ["fish", "/meal-fish.webp"],
  ["steak", "/meal-steak-beans.webp"],
  ["beef", "/meal-beef.webp"],
  ["tofu", "/meal-tofu-rice.webp"],
  ["pork", "/meal-pork-prep.webp"],
  ["pesto", "/meal-pesto-spaghetti.webp"],
  ["coconut", "/meal-coconut-curry.webp"],
  ["lentil", "/meal-lentil-soup.webp"],
  ["curry", "/meal-vegetarian.webp"],
  ["pasta", "/meal-quick.webp"],
  ["quinoa", "/meal-buddha-bowl.webp"],
  ["hummus", "/meal-hummus.webp"],
  ["apple", "/meal-apple-snack.webp"],
  ["egg", "/meal-egg-scramble.webp"],
  ["chicken", "/meal-chicken.webp"],
];

const MEAL_IMAGE_BY_TYPE: Record<string, string> = {
  breakfast: "/meal-breakfast.webp",
  lunch: "/meal-vegetarian.webp",
  dinner: "/meal-chicken.webp",
  snack: "/meal-trail-mix.webp",
};

export const SAMPLE_IMAGES = [
  "/meal-parfait.webp",
  "/meal-caesar.webp",
  "/meal-katsu.webp",
  "/meal-apple-snack.webp",
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
  return MEAL_IMAGE_BY_TYPE[type] ?? "/meal-chicken.webp";
}
