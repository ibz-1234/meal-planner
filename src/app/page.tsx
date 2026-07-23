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
      { name: "Salmon & Asparagus Traybake", time: "35 min", tag: "Fish", image: "/meal-fish.jpg" },
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
          <div className="flex min-w-max items-center gap-2 rounded-full border border-card-border bg-card p-2 shadow-sm">
            {CATEGORIES.map((item) => {
              const isActive = item.label === activeCategory;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveCategory(item.label)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#e11d2e] text-white"
                      : "bg-transparent text-foreground hover:bg-primary-light/50"
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
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              {t("hero.kicker")}
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              <span className="hand-underline">{t("hero.title").split(" ")[0]}</span>{" "}
              {t("hero.title").split(" ").slice(1).join(" ")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <p className="font-hand mt-3 -rotate-1 text-2xl text-primary">
              cooked by you, planned by us — no fuss
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/preview"
                className="rounded-xl bg-[#e11d2e] px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:brightness-95"
              >
                {t("hero.cta")}
              </Link>
              <Link
                href="/sample"
                className="rounded-xl border border-card-border bg-card px-6 py-3.5 text-base font-semibold transition hover:border-primary hover:text-primary"
              >
                {t("hero.sample")}
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              {t("hero.freePreview")} · {t("hero.pricesFrom")} {format(7.99)}
              {t("hero.perMonth")}
            </p>
          </div>

          <div className="relative rotate-1 rounded-3xl border border-card-border bg-card p-4 shadow-lg sm:p-5 tape">
            <div className="flex items-center justify-between border-b border-card-border pb-3">
              <div>
                <p className="text-sm font-semibold">
                  {category.label} {t("menu.suffix")}
                </p>
                <p className="text-xs text-muted">{t("menu.subtitle")}</p>
              </div>
              <span className="font-hand -rotate-2 text-xl text-primary">
                this week’s picks
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {category.recipes.map((recipe, idx) => (
                <article
                  key={recipe.name}
                  className={`overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm ${
                    idx % 2 === 0 ? "-rotate-1" : "rotate-1"
                  }`}
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
                      <div className="rounded-full bg-[#e11d2e] px-2.5 py-1 text-xs font-bold text-white">
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

      <section className="border-y border-card-border bg-card py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Prices compared across the shops you actually use
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-base font-bold text-foreground/70">
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
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold">Three steps, thirty seconds.</h2>
            <ol className="mt-6 space-y-5">
              {[
                { step: "Tell us your budget, people and diet", note: "that’s it — allergies and calories can wait" },
                { step: "We build your week of meals", note: "real recipes like Chicken Katsu Curry and Lentil Dahl" },
                { step: "Shop the cheapest basket and cook", note: "list grouped by aisle, cheapest shop circled" },
              ].map((item, idx) => (
                <li key={item.step} className="flex gap-4">
                  <span className="font-hand mt-0.5 text-3xl leading-none text-primary">{idx + 1}.</span>
                  <div>
                    <p className="font-bold">{item.step}</p>
                    <p className="font-hand text-lg text-muted">{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative -rotate-1 rounded-3xl border border-card-border bg-card p-6 shadow-lg tape">
            <p className="text-sm font-semibold">Weekly basket · 21 meals, 2 people</p>
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
                      ? "border-primary bg-primary-light/40"
                      : "border-card-border"
                  }`}
                >
                  <span className="font-semibold">{row.shop}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-bold">{format(row.priceGBP)}</span>
                    {row.cheapest && (
                      <span className="font-hand -rotate-2 text-lg text-primary">cheapest!</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-hand mt-4 rotate-1 text-right text-2xl text-primary">
              you save {format(7.6)} this week
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.title}
              className={`rounded-2xl border border-card-border bg-card p-5 shadow-sm ${
                idx % 2 === 0 ? "-rotate-1" : "rotate-1"
              }`}
            >
              <span className="font-hand text-3xl text-primary">{idx + 1}.</span>
              <h3 className="mt-2 text-lg font-bold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              From our early users
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              ⭐ 4.9/5 from beta testers
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {TESTIMONIALS.map((item, idx) => (
              <figure
                key={item.name}
                className={`rounded-2xl border border-card-border bg-background p-5 shadow-sm ${
                  idx % 2 === 0 ? "-rotate-1" : "rotate-1"
                }`}
              >
                <blockquote className="text-sm">“{item.quote}”</blockquote>
                <figcaption className="mt-3">
                  <span className="font-bold">{item.name}</span>
                  <span className="font-hand ml-2 text-lg text-muted">{item.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-3xl font-bold">Why not just use ChatGPT?</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-card-border bg-card text-sm">
            <thead>
              <tr className="bg-primary-light/40 text-left">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-bold text-primary">Mealsmith</th>
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
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Why people keep using it
            </p>
            <h2 className="mt-3 text-3xl font-bold">It feels like a menu, not a spreadsheet.</h2>
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
              <div key={item.title} className="rounded-2xl border border-card-border bg-background p-5">
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />
    </div>
  );
}
