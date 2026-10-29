"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const [activeCategory, setActiveCategory] = useState("Plant-Based");
  const [selectedRecipe, setSelectedRecipe] = useState<CardRecipe | null>(null);
  const category =
    CATEGORIES.find((c) => c.label === activeCategory) ?? CATEGORIES[0];

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:pt-14">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="kicker text-primary">
              {t("hero.kicker")}
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {t("hero.title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="mark">{t("hero.title").split(" ").slice(-1)}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium text-muted sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/preview" className="btn btn-primary">
                {t("hero.cta")}
              </Link>
              <Link href="/sample" className="btn btn-ghost">
                {t("hero.sample")}
              </Link>
            </div>
            <p className="mt-5 text-sm font-semibold text-muted">
              {t("hero.freePreview")} · {t("hero.pricesFrom")} {format(5.99)}
              {t("hero.perMonth")}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg pb-10 pl-8">
            <div className="hard rounded-3xl bg-card p-3">
              <Image
                src="/meal-katsu.webp"
                alt="Chicken Katsu Curry"
                width={800}
                height={550}
                priority
                className="h-72 w-full rounded-2xl border-2 border-card-border object-cover sm:h-80"
              />
              <div className="flex items-center justify-between px-2 pb-1 pt-3">
                <p className="font-display text-lg font-extrabold">Chicken Katsu Curry</p>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white">
                  tonight
                </span>
              </div>
            </div>
            <div className="hard-sm absolute -bottom-2 left-0 w-40 rounded-2xl bg-card p-2 sm:w-48">
              <Image
                src="/meal-salmon-traybake.webp"
                alt="Salmon and asparagus traybake"
                width={400}
                height={260}
                className="h-24 w-full rounded-xl border-2 border-card-border object-cover sm:h-28"
              />
              <p className="px-1 pt-1.5 text-xs font-bold leading-tight">
                Salmon traybake — Wednesday
              </p>
            </div>
            <div className="hard-sm absolute -right-2 top-6 rounded-full bg-accent px-4 py-2 font-display text-sm font-extrabold text-white">
              save {format(7.6)}/week
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker text-primary">What&apos;s for dinner</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight">
              Pick a craving. We plan the week.
            </h2>
          </div>
          <span className="rounded-full border-2 border-card-border bg-secondary px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-foreground">
            this week · {category.label}
          </span>
        </div>

        <div className="mt-6 overflow-x-auto pb-3">
          <div className="hard-sm flex min-w-max items-center gap-2 rounded-full bg-card p-2">
            {CATEGORIES.map((item) => {
              const isActive = item.label === activeCategory;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveCategory(item.label)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-transparent text-foreground hover:bg-secondary-light"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isActive ? "bg-white/15 text-white" : "bg-black/5 text-muted"
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {category.recipes.map((recipe) => (
            <article
              key={recipe.name}
              className="hard-sm overflow-hidden rounded-2xl bg-card"
            >
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
                  className="h-44 w-full border-b-2 border-card-border object-cover transition-transform duration-200 hover:scale-[1.03]"
                />
              </button>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-semibold text-muted">
                    {recipe.time}
                  </div>
                  <div className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">
                    {recipe.tag}
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-tight">{recipe.name}</h3>
                <p className="mt-2 text-sm text-muted">
                  Proper food, made in your kitchen.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedRecipe(recipe)}
                  className="mt-3 text-sm font-bold text-primary underline-offset-2 hover:underline"
                >
                  View recipe &amp; prices →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-card-border bg-secondary py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="kicker text-center text-foreground/60">
            Prices compared across the shops you actually use
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-display text-lg font-extrabold text-foreground">
            {SUPERMARKETS.map((shop) => (
              <span key={shop.name} className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold text-white"
                  style={{ backgroundColor: shop.color }}
                >
                  {shop.name.charAt(0)}
                </span>
                {shop.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="hard rounded-3xl bg-card p-6">
            <p className="font-display text-lg font-extrabold">Weekly basket · 21 meals, 2 people</p>
            <div className="mt-4 space-y-3">
              {[
                { shop: "Tesco", priceGBP: 47.2, cheapest: false },
                { shop: "Sainsbury's", priceGBP: 49.8, cheapest: false },
                { shop: "Asda", priceGBP: 43.1, cheapest: false },
                { shop: "Aldi", priceGBP: 39.6, cheapest: true },
              ].map((row) => (
                <div
                  key={row.shop}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                    row.cheapest
                      ? "border-2 border-card-border bg-accent-light"
                      : "border-card-border"
                  }`}
                >
                  <span className="font-bold">{row.shop}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-display text-lg font-extrabold">{format(row.priceGBP)}</span>
                    {row.cheapest && (
                      <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-extrabold uppercase text-white">
                        cheapest
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-xl bg-secondary px-4 py-3 text-center font-display text-lg font-extrabold text-foreground">
              You save {format(7.6)} this week
            </p>
          </div>
          <div>
            <p className="kicker text-primary">
              How it works
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight">Three steps, thirty seconds.</h2>
            <ol className="mt-6 space-y-5">
              {[
                { step: "Tell us your budget, people and diet", note: "that’s it — allergies and calories can wait" },
                { step: "We build your week of meals", note: "real recipes like Chicken Katsu Curry and Lentil Dahl" },
                { step: "Shop the cheapest basket and cook", note: "list grouped by aisle, cheapest shop circled" },
              ].map((item, idx) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-card-border bg-secondary font-display text-lg font-extrabold text-foreground">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-extrabold">{item.step}</p>
                    <p className="mt-0.5 text-sm font-medium text-muted">{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="hard-sm rounded-2xl bg-card p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-card-border bg-secondary text-foreground">
                <feature.Icon />
              </span>
              <h3 className="mt-3 font-display text-lg font-extrabold">{feature.title}</h3>
              <p className="mt-1 text-sm font-medium text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="kicker text-primary">
              From our early users
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="flex gap-0.5 text-secondary">
                {[0, 1, 2, 3, 4].map((i) => (
                  <IconStar key={i} className="h-6 w-6" />
                ))}
              </span>
              <h2 className="font-display text-4xl font-extrabold tracking-tight">
                4.9/5 from beta testers
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <figure
                key={item.name}
                className="hard-sm rounded-2xl bg-card p-5"
              >
                <blockquote className="text-sm font-medium">“{item.quote}”</blockquote>
                <figcaption className="mt-3">
                  <span className="font-bold">{item.name}</span>
                  <span className="ml-2 text-sm text-muted">{item.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-center font-display text-4xl font-extrabold tracking-tight">Why not just use ChatGPT?</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="hard w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden rounded-2xl bg-card text-sm">
            <thead>
              <tr className="border-b-2 border-card-border bg-secondary-light text-left">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-extrabold text-primary">Tiffinly</th>
                <th className="px-4 py-3 font-semibold">ChatGPT</th>
                <th className="px-4 py-3 font-semibold">Recipe websites</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="border-t border-card-border">
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

      <section className="bg-card py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kicker text-primary">
              Why people keep using it
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight">It feels like a menu, not a spreadsheet.</h2>
            <p className="mt-3 text-muted">
              The layout stays readable on small phones, stretches naturally on
              tablets and desktops, and keeps the important bits right up top.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { Icon: IconClipboard, title: "Save time", desc: "Meals picked for you" },
              { Icon: IconBasket, title: "Save money", desc: "Best local shop first" },
              { Icon: IconLeaf, title: "Stay on track", desc: "Progress is saved" },
            ].map((item) => (
              <div key={item.title} className="hard-sm rounded-2xl bg-card p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-card-border bg-primary text-white">
                  <item.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-display font-extrabold">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-muted">{item.desc}</p>
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
