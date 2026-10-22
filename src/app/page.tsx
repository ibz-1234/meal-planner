"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import PricingSection from "@/components/PricingSection";

type Recipe = { name: string; time: string; tag: string; image: string };

const CATEGORIES: { label: string; count: number; recipes: Recipe[] }[] = [
  {
    label: "5-Minute Meals",
    count: 8,
    recipes: [
      { name: "Pesto Spaghetti with Burst Tomatoes", time: "5 min", tag: "5-Minute", image: "/meal-quick.jpg" },
      { name: "Greek Yogurt Berry Bowl", time: "5 min", tag: "5-Minute", image: "/meal-parfait.jpg" },
      { name: "Sesame Tofu Rice Bowl", time: "5 min", tag: "5-Minute", image: "/meal-plant-based.jpg" },
      { name: "Chicken & Rice Salad Plate", time: "5 min", tag: "5-Minute", image: "/meal-greek-bowl.jpg" },
    ],
  },
  {
    label: "Prepped in 5",
    count: 3,
    recipes: [
      { name: "Weekly Chicken Prep Boxes", time: "5 min prep", tag: "Prepped", image: "/meal-prepped.jpg" },
      { name: "Granola Parfait Jars", time: "5 min prep", tag: "Prepped", image: "/meal-parfait.jpg" },
      { name: "Quinoa Lunch Boxes", time: "5 min prep", tag: "Prepped", image: "/meal-glutenfree.jpg" },
      { name: "Tofu Stir-Fry Boxes", time: "5 min prep", tag: "Prepped", image: "/meal-plant-based.jpg" },
    ],
  },
  {
    label: "Chicken",
    count: 14,
    recipes: [
      { name: "Chicken Katsu Curry", time: "35 min", tag: "Chicken", image: "/meal-katsu.jpg" },
      { name: "Greek Chicken Bowls", time: "25 min", tag: "Chicken", image: "/meal-greek-bowl.jpg" },
      { name: "Chicken Meal-Prep Boxes", time: "40 min", tag: "Chicken", image: "/meal-prepped.jpg" },
      { name: "Lime Chicken Quinoa Bowl", time: "25 min", tag: "Chicken", image: "/meal-glutenfree.jpg" },
    ],
  },
  {
    label: "Beef & Pork",
    count: 16,
    recipes: [
      { name: "Steak with Chimichurri & Potatoes", time: "35 min", tag: "Beef", image: "/meal-beef.jpg" },
      { name: "Chilli Con Carne", time: "40 min", tag: "Beef", image: "/meal-chilli.jpg" },
      { name: "Pesto Pasta with Crispy Bacon", time: "20 min", tag: "Pork", image: "/meal-quick.jpg" },
      { name: "Pork & Veg Prep Boxes", time: "40 min", tag: "Pork", image: "/meal-prepped.jpg" },
    ],
  },
  {
    label: "Fish",
    count: 15,
    recipes: [
      { name: "Lemon Salmon with Crushed Potatoes", time: "30 min", tag: "Fish", image: "/meal-fish.jpg" },
      { name: "Salmon & Asparagus Traybake", time: "35 min", tag: "Fish", image: "/meal-salmon-traybake.jpg" },
      { name: "Tuna Salad Bowl with Herbs", time: "25 min", tag: "Fish", image: "/meal-tuna-salad.jpg" },
      { name: "Salmon Quinoa Salad", time: "20 min", tag: "Fish", image: "/meal-salmon-salad.jpg" },
    ],
  },
  {
    label: "Vegetarian",
    count: 34,
    recipes: [
      { name: "Cauliflower Curry with Naan", time: "30 min", tag: "Vegetarian", image: "/meal-vegetarian.jpg" },
      { name: "Creamy Mushroom Pasta", time: "20 min", tag: "Vegetarian", image: "/meal-mushroom-pasta.jpg" },
      { name: "Granola & Honey Breakfast Bowl", time: "5 min", tag: "Vegetarian", image: "/meal-breakfast.jpg" },
      { name: "Sesame Veg & Rice Bowl", time: "25 min", tag: "Vegetarian", image: "/meal-plant-based.jpg" },
    ],
  },
  {
    label: "Plant-Based",
    count: 15,
    recipes: [
      { name: "Crispy Tofu & Sesame Greens", time: "30 min", tag: "Plant-Based", image: "/meal-plant-based.jpg" },
      { name: "Cauliflower Curry with Rice", time: "30 min", tag: "Plant-Based", image: "/meal-vegetarian.jpg" },
      { name: "Lentil Dahl with Rice", time: "35 min", tag: "Plant-Based", image: "/meal-dahl.jpg" },
      { name: "Tomato Pesto Pasta (Vegan)", time: "15 min", tag: "Plant-Based", image: "/meal-quick.jpg" },
    ],
  },
  {
    label: "Gluten-Free",
    count: 13,
    recipes: [
      { name: "Chicken Quinoa & Avocado Bowl", time: "25 min", tag: "Gluten-Free", image: "/meal-glutenfree.jpg" },
      { name: "Steak with Potatoes & Beans", time: "35 min", tag: "Gluten-Free", image: "/meal-beef.jpg" },
      { name: "Salmon with Asparagus", time: "30 min", tag: "Gluten-Free", image: "/meal-fish.jpg" },
      { name: "Chicken Rice & Salad Plate", time: "30 min", tag: "Gluten-Free", image: "/meal-greek-bowl.jpg" },
    ],
  },
  {
    label: "Dairy-Free",
    count: 22,
    recipes: [
      { name: "Coconut Chicken Curry", time: "35 min", tag: "Dairy-Free", image: "/meal-dairyfree.jpg" },
      { name: "Sticky Sesame Tofu Bowl", time: "30 min", tag: "Dairy-Free", image: "/meal-plant-based.jpg" },
      { name: "Salmon with Crushed Potatoes", time: "30 min", tag: "Dairy-Free", image: "/meal-fish.jpg" },
      { name: "Quinoa Avocado Bowl", time: "25 min", tag: "Dairy-Free", image: "/meal-glutenfree.jpg" },
    ],
  },
];

const FEATURES = [
  { icon: "📋", title: "7-day meal structure", desc: "Breakfast, lunch, dinner, and snacks — planned in one place." },
  { icon: "🏷️", title: "Dietary filters", desc: "Choose vegetarian, gluten-free, dairy-free, halal, and more." },
  { icon: "🛒", title: "Shopping lists", desc: "Items grouped by aisle so your shop is quicker." },
  { icon: "🏪", title: "Local shops", desc: "Country-specific supermarkets, cheapest store highlighted, closest branches linked." },
];

const SUPERMARKETS = [
  "Tesco",
  "Aldi",
  "Lidl",
  "Asda",
  "Morrisons",
  "Sainsbury's",
  "Iceland",
  "Co-op",
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

const COMPARISON_ROWS: { feature: string; us: boolean; gpt: string; sites: string }[] = [
  { feature: "Weekly plans in one tap", us: true, gpt: "✗", sites: "✗" },
  { feature: "Shopping lists by aisle", us: true, gpt: "✗", sites: "✗" },
  { feature: "UK supermarket prices", us: true, gpt: "✗", sites: "✗" },
  { feature: "Budget optimisation", us: true, gpt: "✗", sites: "✗" },
  { feature: "Dietary preferences", us: true, gpt: "Limited", sites: "Limited" },
];

export default function Home() {
  const { format } = useCurrency();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Plant-Based");
  const category =
    CATEGORIES.find((c) => c.label === activeCategory) ?? CATEGORIES[0];

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
        <div className="overflow-x-auto pb-3">
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="kicker text-primary">
              {t("hero.kicker")}
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="mark">{t("hero.title").split(" ")[0]}</span>{" "}
              {t("hero.title").split(" ").slice(1).join(" ")}
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

          <div className="hard rounded-3xl bg-card p-4 sm:p-5">
            <div className="flex items-center justify-between border-b-2 border-ink pb-3">
              <div>
                <p className="font-display text-lg font-extrabold">
                  {category.label} {t("menu.suffix")}
                </p>
                <p className="text-xs font-medium text-muted">{t("menu.subtitle")}</p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-ink">
                this week
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {category.recipes.map((recipe) => (
                <article
                  key={recipe.name}
                  className="hard-sm overflow-hidden rounded-2xl bg-card"
                >
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    width={800}
                    height={550}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-semibold text-muted">
                        {recipe.time}
                      </div>
                      <div className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">
                        {recipe.tag}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-lg font-bold leading-tight">{recipe.name}</h2>
                      <p className="mt-2 text-sm text-muted">
                        Proper food, made in your kitchen.
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-ink bg-secondary py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="kicker text-center text-ink/60">
            Prices compared across the shops you actually use
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-display text-lg font-extrabold text-ink">
            {SUPERMARKETS.map((shop) => (
              <span key={shop} className="flex items-center gap-1.5">
                <span className="text-primary">✓</span> {shop}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
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
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-secondary font-display text-lg font-extrabold text-ink">
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
                      ? "border-2 border-ink bg-accent-light"
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
            <p className="mt-5 rounded-xl bg-secondary px-4 py-3 text-center font-display text-lg font-extrabold text-ink">
              You save {format(7.6)} this week
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.title}
              className="hard-sm rounded-2xl bg-card p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-primary font-display text-base font-extrabold text-white">
                {idx + 1}
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
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight">
              ⭐ 4.9/5 from beta testers
            </h2>
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
              <tr className="border-b-2 border-ink bg-secondary-light text-left">
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
                  <td className="border-t border-card-border px-4 py-3 font-bold text-primary">✓</td>
                  <td className="border-t border-card-border px-4 py-3 text-muted">{row.gpt}</td>
                  <td className="border-t border-card-border px-4 py-3 text-muted">{row.sites}</td>
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
              { title: "Save time", desc: "Meals picked for you" },
              { title: "Save money", desc: "Best local shop first" },
              { title: "Stay on track", desc: "Progress is saved" },
            ].map((item) => (
              <div key={item.title} className="hard-sm rounded-2xl bg-card p-5">
                <h3 className="font-display font-extrabold">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />
    </div>
  );
}
