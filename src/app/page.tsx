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
      { name: "Greek Yogurt Berry Bowl", time: "5 min", tag: "5-Minute", image: "/meal-breakfast.jpg" },
      { name: "Sesame Tofu Rice Bowl", time: "5 min", tag: "5-Minute", image: "/meal-plant-based.jpg" },
      { name: "Chicken & Rice Salad Plate", time: "5 min", tag: "5-Minute", image: "/meal-chicken.jpg" },
    ],
  },
  {
    label: "Prepped in 5",
    count: 3,
    recipes: [
      { name: "Weekly Chicken Prep Boxes", time: "5 min prep", tag: "Prepped", image: "/meal-prepped.jpg" },
      { name: "Granola Parfait Jars", time: "5 min prep", tag: "Prepped", image: "/meal-breakfast.jpg" },
      { name: "Quinoa Lunch Boxes", time: "5 min prep", tag: "Prepped", image: "/meal-glutenfree.jpg" },
      { name: "Tofu Stir-Fry Boxes", time: "5 min prep", tag: "Prepped", image: "/meal-plant-based.jpg" },
    ],
  },
  {
    label: "Chicken",
    count: 14,
    recipes: [
      { name: "Charred Chicken & Broccoli Plate", time: "30 min", tag: "Chicken", image: "/meal-chicken.jpg" },
      { name: "Coconut Chicken Curry", time: "35 min", tag: "Chicken", image: "/meal-dairyfree.jpg" },
      { name: "Chicken Meal-Prep Boxes", time: "40 min", tag: "Chicken", image: "/meal-prepped.jpg" },
      { name: "Lime Chicken Quinoa Bowl", time: "25 min", tag: "Chicken", image: "/meal-glutenfree.jpg" },
    ],
  },
  {
    label: "Beef & Pork",
    count: 16,
    recipes: [
      { name: "Steak with Chimichurri & Potatoes", time: "35 min", tag: "Beef", image: "/meal-beef.jpg" },
      { name: "Beef & Green Bean Traybake", time: "40 min", tag: "Beef", image: "/meal-beef.jpg" },
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
      { name: "Fish Rice Bowl with Herbs", time: "25 min", tag: "Fish", image: "/meal-plant-based.jpg" },
      { name: "Salmon Quinoa Salad", time: "20 min", tag: "Fish", image: "/meal-glutenfree.jpg" },
    ],
  },
  {
    label: "Vegetarian",
    count: 34,
    recipes: [
      { name: "Cauliflower Curry with Naan", time: "30 min", tag: "Vegetarian", image: "/meal-vegetarian.jpg" },
      { name: "Pesto Spaghetti with Parmesan", time: "15 min", tag: "Vegetarian", image: "/meal-quick.jpg" },
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
      { name: "Coconut Veg Curry Bowl", time: "35 min", tag: "Plant-Based", image: "/meal-dairyfree.jpg" },
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
      { name: "Chicken Rice & Salad Plate", time: "30 min", tag: "Gluten-Free", image: "/meal-chicken.jpg" },
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

export default function Home() {
  const { format } = useCurrency();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Plant-Based");
  const category =
    CATEGORIES.find((c) => c.label === activeCategory) ?? CATEGORIES[0];

  return (
    <div className="bg-background">
      <section className="border-b border-card-border bg-[#e11d2e] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-2xl font-black tracking-tight">
            <Image
              src="/logo.png"
              alt="Mealsmith logo"
              width={36}
              height={36}
              className="h-9 w-9 rounded bg-white p-0.5"
            />
            <span>Mealsmith</span>
          </div>
          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] md:flex">
            <span>{t("nav.chooseMeals")}</span>
            <span>{t("nav.localShops")}</span>
            <span>{t("nav.saveProgress")}</span>
          </div>
          <Link
            href="/preview"
            className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
          >
            {t("nav.getStarted")}
          </Link>
        </div>
      </section>

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
              {t("hero.title")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">
              {t("hero.subtitle")}
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

          <div className="rounded-3xl border border-card-border bg-card p-4 shadow-lg sm:p-5">
            <div className="flex items-center justify-between border-b border-card-border pb-3">
              <div>
                <p className="text-sm font-semibold">
                  {category.label} {t("menu.suffix")}
                </p>
                <p className="text-xs text-muted">{t("menu.subtitle")}</p>
              </div>
              <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">
                This week
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {category.recipes.map((recipe) => (
                <article
                  key={recipe.name}
                  className="overflow-hidden rounded-2xl border border-card-border bg-card"
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

      <section className="border-y border-card-border bg-card py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 text-sm text-muted sm:px-6">
          <span>✓ Evidence-based nutrition</span>
          <span>✓ Country-specific shops</span>
          <span>✓ Cheapest shop highlighted</span>
          <span>✓ Progress saved in browser</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.title}
              className={`rounded-3xl border border-card-border p-5 ${
                idx === 0 ? "bg-[#fff7ed]" : idx === 1 ? "bg-[#f0fdf4]" : idx === 2 ? "bg-[#eff6ff]" : "bg-[#fdf2f8]"
              }`}
            >
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="mt-3 text-lg font-bold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted">{feature.desc}</p>
            </div>
          ))}
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
