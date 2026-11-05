"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrentUser } from "@/lib/auth";
import PricingSection from "@/components/PricingSection";
import RecipeDetailModal, { type CardRecipe } from "@/components/RecipeDetailModal";
import {
  IconBasket,
  IconCheck,
  IconClipboard,
  IconCross,
  IconLeaf,
  IconShop,
  IconStar,
  IconTag,
} from "@/lib/icons";

type Recipe = { name: string; time: string; tag: string; image: string };

const CATEGORIES: { label: string; count: number; recipes: Recipe[] }[] = [
  {
    label: "5-Minute Meals",
    count: 8,
    recipes: [
      { name: "Pesto Spaghetti with Burst Tomatoes", time: "5 min", tag: "5-Minute", image: "/meal-pesto-spaghetti.webp" },
      { name: "Greek Yogurt Berry Bowl", time: "5 min", tag: "5-Minute", image: "/meal-parfait.webp" },
      { name: "Sesame Tofu Rice Bowl", time: "5 min", tag: "5-Minute", image: "/meal-tofu-rice.webp" },
      { name: "Chicken & Rice Salad Plate", time: "5 min", tag: "5-Minute", image: "/meal-chicken-rice.webp" },
    ],
  },
  {
    label: "Prepped in 5",
    count: 3,
    recipes: [
      { name: "Weekly Chicken Prep Boxes", time: "5 min prep", tag: "Prepped", image: "/meal-prepped.webp" },
      { name: "Granola Parfait Jars", time: "5 min prep", tag: "Prepped", image: "/meal-parfait.webp" },
      { name: "Quinoa Lunch Boxes", time: "5 min prep", tag: "Prepped", image: "/meal-buddha-bowl.webp" },
      { name: "Tofu Stir-Fry Boxes", time: "5 min prep", tag: "Prepped", image: "/meal-plant-based.webp" },
    ],
  },
  {
    label: "Chicken",
    count: 14,
    recipes: [
      { name: "Chicken Katsu Curry", time: "35 min", tag: "Chicken", image: "/meal-katsu.webp" },
      { name: "Greek Chicken Bowls", time: "25 min", tag: "Chicken", image: "/meal-greek-bowl.webp" },
      { name: "Chicken Meal-Prep Boxes", time: "40 min", tag: "Chicken", image: "/meal-prepped.webp" },
      { name: "Lime Chicken Quinoa Bowl", time: "25 min", tag: "Chicken", image: "/meal-lime-chicken.webp" },
    ],
  },
  {
    label: "Beef & Pork",
    count: 16,
    recipes: [
      { name: "Steak with Chimichurri & Potatoes", time: "35 min", tag: "Beef", image: "/meal-beef.webp" },
      { name: "Chilli Con Carne", time: "40 min", tag: "Beef", image: "/meal-chilli.webp" },
      { name: "Pesto Pasta with Crispy Bacon", time: "20 min", tag: "Pork", image: "/meal-pesto-spaghetti.webp" },
      { name: "Pork & Veg Prep Boxes", time: "40 min", tag: "Pork", image: "/meal-pork-prep.webp" },
    ],
  },
  {
    label: "Fish",
    count: 15,
    recipes: [
      { name: "Lemon Salmon with Crushed Potatoes", time: "30 min", tag: "Fish", image: "/meal-salmon-potatoes.webp" },
      { name: "Salmon & Asparagus Traybake", time: "35 min", tag: "Fish", image: "/meal-salmon-traybake.webp" },
      { name: "Tuna Salad Bowl with Herbs", time: "25 min", tag: "Fish", image: "/meal-tuna-salad.webp" },
      { name: "Salmon Quinoa Salad", time: "20 min", tag: "Fish", image: "/meal-salmon-salad.webp" },
    ],
  },
  {
    label: "Vegetarian",
    count: 34,
    recipes: [
      { name: "Cauliflower Curry with Naan", time: "30 min", tag: "Vegetarian", image: "/meal-vegetarian.webp" },
      { name: "Creamy Mushroom Pasta", time: "20 min", tag: "Vegetarian", image: "/meal-mushroom-pasta.webp" },
      { name: "Granola & Honey Breakfast Bowl", time: "5 min", tag: "Vegetarian", image: "/meal-breakfast.webp" },
      { name: "Sesame Veg & Rice Bowl", time: "25 min", tag: "Vegetarian", image: "/meal-tofu-rice.webp" },
    ],
  },
  {
    label: "Plant-Based",
    count: 15,
    recipes: [
      { name: "Crispy Tofu & Sesame Greens", time: "30 min", tag: "Plant-Based", image: "/meal-plant-based.webp" },
      { name: "Cauliflower Curry with Rice", time: "30 min", tag: "Plant-Based", image: "/meal-vegetarian.webp" },
      { name: "Lentil Dahl with Rice", time: "35 min", tag: "Plant-Based", image: "/meal-dahl.webp" },
      { name: "Tomato Pesto Pasta (Vegan)", time: "15 min", tag: "Plant-Based", image: "/meal-pasta-primavera.webp" },
    ],
  },
  {
    label: "Gluten-Free",
    count: 13,
    recipes: [
      { name: "Chicken Quinoa & Avocado Bowl", time: "25 min", tag: "Gluten-Free", image: "/meal-glutenfree.webp" },
      { name: "Steak with Potatoes & Beans", time: "35 min", tag: "Gluten-Free", image: "/meal-steak-beans.webp" },
      { name: "Salmon with Asparagus", time: "30 min", tag: "Gluten-Free", image: "/meal-salmon-traybake.webp" },
      { name: "Chicken Rice & Salad Plate", time: "30 min", tag: "Gluten-Free", image: "/meal-chicken-rice.webp" },
    ],
  },
  {
    label: "Dairy-Free",
    count: 22,
    recipes: [
      { name: "Coconut Chicken Curry", time: "35 min", tag: "Dairy-Free", image: "/meal-coconut-curry.webp" },
      { name: "Sticky Sesame Tofu Bowl", time: "30 min", tag: "Dairy-Free", image: "/meal-tofu-rice.webp" },
      { name: "Salmon with Crushed Potatoes", time: "30 min", tag: "Dairy-Free", image: "/meal-salmon-potatoes.webp" },
      { name: "Quinoa Avocado Bowl", time: "25 min", tag: "Dairy-Free", image: "/meal-buddha-bowl.webp" },
    ],
  },
];

const FEATURES = [
  { Icon: IconClipboard, title: "7-day meal structure", desc: "Breakfast, lunch, dinner, and snacks — planned in one place." },
  { Icon: IconTag, title: "Dietary filters", desc: "Choose vegetarian, gluten-free, dairy-free, halal, and more." },
  { Icon: IconBasket, title: "Shopping lists", desc: "Items grouped by aisle so your shop is quicker." },
  { Icon: IconShop, title: "Local shops", desc: "Country-specific supermarkets, cheapest store highlighted, closest branches linked." },
];

const SUPERMARKETS: { name: string; color: string }[] = [
  { name: "Tesco", color: "#00539F" },
  { name: "Aldi", color: "#F28C28" },
  { name: "Lidl", color: "#E8A100" },
  { name: "Asda", color: "#78BE20" },
  { name: "Morrisons", color: "#F5A800" },
  { name: "Sainsbury's", color: "#F06C00" },
  { name: "Iceland", color: "#DA291C" },
  { name: "Co-op", color: "#00B4AA" },
];

const TESTIMONIALS = [
  {
    quote: "Saved me £28 on groceries this week. The Aldi basket comparison alone pays for it.",
    name: "Sophie M.",
    detail: "feeding a family of 4, Leeds",
  },
  {
    quote: "Meal planning finally became easy. I stopped ordering takeaway on Wednesdays.",
    name: "Daniel R.",
    detail: "cooks 5 nights a week, Bristol",
  },
  {
    quote: "The shopping list grouped by aisle is the small thing that made me stay.",
    name: "Priya K.",
    detail: "early beta user, London",
  },
];

const COMPARISON_ROWS: { feature: string; us: boolean; gpt: false | string; sites: false | string }[] = [
  { feature: "Weekly plans in one tap", us: true, gpt: false, sites: false },
  { feature: "Shopping lists by aisle", us: true, gpt: false, sites: false },
  { feature: "UK supermarket prices", us: true, gpt: false, sites: false },
  { feature: "Budget optimisation", us: true, gpt: false, sites: false },
  { feature: "Dietary preferences", us: true, gpt: "Limited", sites: "Limited" },
];

export default function Home() {
  const { format } = useCurrency();
  const { t } = useLanguage();
  const router = useRouter();
  const user = useCurrentUser();
  const [activeCategory, setActiveCategory] = useState("Plant-Based");
  const [selectedRecipe, setSelectedRecipe] = useState<CardRecipe | null>(null);
  const category =
    CATEGORIES.find((c) => c.label === activeCategory) ?? CATEGORIES[0];

  useEffect(() => {
    if (user === null) router.replace("/login");
  }, [user, router]);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-lg font-semibold">Welcome to Tiffinly</p>
        <p className="mt-2 text-sm text-muted">
          Taking you to the login page…
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:pt-20">
        <p className="kicker text-primary">
          {t("hero.kicker")}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          {t("hero.title").split(" ").slice(0, -1).join(" ")}{" "}
          <span className="mark">{t("hero.title").split(" ").slice(-1)}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          {t("hero.subtitle")}
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="/preview" className="btn btn-primary">
            {t("hero.cta")}
          </Link>
          <Link href="/sample" className="btn btn-ghost">
            {t("hero.sample")}
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted">
          {t("hero.freePreview")} · {t("hero.pricesFrom")}{" "}
          {format(5.99)}
          {t("hero.perMonth")}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr]">
          <figure className="overflow-hidden rounded-2xl">
            <Image
              src="/meal-katsu.webp"
              alt="Chicken Katsu Curry"
              width={800}
              height={550}
              priority
              className="h-80 w-full object-cover sm:h-[26rem]"
            />
          </figure>
          <figure className="overflow-hidden rounded-2xl">
            <Image
              src="/meal-salmon-traybake.webp"
              alt="Salmon and asparagus traybake"
              width={800}
              height={550}
              priority
              className="h-80 w-full object-cover sm:h-[26rem]"
            />
          </figure>
        </div>
        <div className="mt-3 flex items-baseline justify-between text-sm text-muted">
          <p>Chicken Katsu Curry · Salmon &amp; Asparagus Traybake — from a real generated week.</p>
          <p className="hidden sm:block">Estimated {format(7.6)} saved/week</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-card-border pb-6">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pick a craving. We plan the week.
          </h2>
          <span className="text-sm font-medium text-muted">
            this week · {category.label}
          </span>
        </div>

        <div className="mt-7 overflow-x-auto pb-2">
          <div className="flex min-w-max items-center gap-6 border-b border-card-border">
            {CATEGORIES.map((item) => {
              const isActive = item.label === activeCategory;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveCategory(item.label)}
                  className={`-mb-px flex items-center gap-1.5 border-b-2 pb-3 text-sm transition ${
                    isActive
                      ? "border-primary font-semibold text-foreground"
                      : "border-transparent text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span className="text-xs text-muted">({item.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {category.recipes.map((recipe) => (
            <article key={recipe.name}>
              <button
                type="button"
                onClick={() => setSelectedRecipe(recipe)}
                className="block w-full cursor-pointer"
                aria-label={`View ${recipe.name} — ingredients, prices and steps`}
              >
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  width={800}
                  height={550}
                  className="h-48 w-full rounded-xl object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </button>
              <div className="mt-4">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span>{recipe.time}</span>
                  <span aria-hidden="true">·</span>
                  <span>{recipe.tag}</span>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug">{recipe.name}</h3>
                <button
                  type="button"
                  onClick={() => setSelectedRecipe(recipe)}
                  className="mt-2 text-sm font-semibold text-primary underline-offset-2 hover:underline"
                >
                  View recipe &amp; prices →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-card-border py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-2 px-4 text-sm text-muted sm:px-6">
          <span className="font-semibold text-foreground">Prices compared at</span>
          {SUPERMARKETS.map((shop) => (
            <span key={shop.name} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: shop.color }}
              />
              {shop.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker text-primary">
              How it works
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Three steps, thirty seconds.</h2>
            <ol className="mt-8 divide-y divide-card-border border-t border-card-border">
              {[
                { step: "Tell us your budget, people and diet", note: "that’s it — allergies and calories can wait" },
                { step: "We build your week of meals", note: "real recipes like Chicken Katsu Curry and Lentil Dahl" },
                { step: "Shop the cheapest basket and cook", note: "list grouped by aisle, cheapest shop circled" },
              ].map((item, idx) => (
                <li key={item.step} className="flex gap-5 py-5">
                  <span className="font-display text-sm font-bold text-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold">{item.step}</p>
                    <p className="mt-0.5 text-sm text-muted">{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="border-t border-card-border pt-8 lg:border-t-0 lg:pt-0">
            <p className="font-semibold">Weekly basket · 21 meals, 2 people</p>
            <div className="mt-5 divide-y divide-card-border border-y border-card-border">
              {[
                { shop: "Tesco", priceGBP: 47.2, cheapest: false },
                { shop: "Sainsbury's", priceGBP: 49.8, cheapest: false },
                { shop: "Asda", priceGBP: 43.1, cheapest: false },
                { shop: "Aldi", priceGBP: 39.6, cheapest: true },
              ].map((row) => (
                <div
                  key={row.shop}
                  className="flex items-center justify-between py-4"
                >
                  <span className={row.cheapest ? "font-semibold" : "font-medium"}>{row.shop}</span>
                  <span className="flex items-center gap-3">
                    {row.cheapest && (
                      <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                        cheapest
                      </span>
                    )}
                    <span className="font-display text-lg font-bold">{format(row.priceGBP)}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">
              You save about <span className="font-semibold text-foreground">{format(7.6)}</span> this week
              by cooking the Aldi basket.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-10 border-t border-card-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <span className="flex h-10 w-10 items-center justify-center text-primary">
                <feature.Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-card-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex gap-0.5 text-secondary">
              {[0, 1, 2, 3, 4].map((i) => (
                <IconStar key={i} className="h-4 w-4" />
              ))}
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              4.9/5 from beta testers
            </h2>
          </div>
          <div className="mt-10 grid gap-10 border-t border-card-border pt-10 sm:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <figure key={item.name}>
                <blockquote className="text-base leading-relaxed">“{item.quote}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-muted"> — {item.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Why not just use ChatGPT?</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-0 rounded-xl border border-card-border bg-card text-sm">
            <thead>
              <tr className="bg-secondary-light text-left">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-bold text-primary">Tiffinly</th>
                <th className="px-4 py-3 font-semibold">ChatGPT</th>
                <th className="px-4 py-3 font-semibold">Recipe websites</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature}>
                  <td className="border-t border-card-border px-4 py-3">{row.feature}</td>
                  <td className="border-t border-card-border px-4 py-3 font-bold text-primary">
                    <IconCheck className="h-5 w-5" />
                  </td>
                  <td className="border-t border-card-border px-4 py-3 text-muted">
                    {row.gpt === false ? <IconCross className="h-5 w-5 opacity-50" /> : row.gpt}
                  </td>
                  <td className="border-t border-card-border px-4 py-3 text-muted">
                    {row.sites === false ? <IconCross className="h-5 w-5 opacity-50" /> : row.sites}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-card-border py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">It feels like a menu, not a spreadsheet.</h2>
            <p className="mt-4 max-w-md text-muted">
              The layout stays readable on small phones, stretches naturally on
              tablets and desktops, and keeps the important bits right up top.
            </p>
          </div>
          <div className="grid gap-8 border-t border-card-border pt-8 sm:grid-cols-3 lg:border-t-0 lg:pt-0">
            {[
              { Icon: IconClipboard, title: "Save time", desc: "Meals picked for you" },
              { Icon: IconBasket, title: "Save money", desc: "Best local shop first" },
              { Icon: IconLeaf, title: "Stay on track", desc: "Progress is saved" },
            ].map((item) => (
              <div key={item.title}>
                <span className="flex h-9 w-9 items-center justify-center text-primary">
                  <item.Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />

      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
