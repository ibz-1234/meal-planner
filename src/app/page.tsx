"use client";

import Link from "next/link";
import { useCurrency } from "@/contexts/CurrencyContext";

const CATEGORY_COUNTS = [
  { label: "5-Minute Meals", count: 8 },
  { label: "Prepped in 5", count: 3 },
  { label: "Chicken", count: 14 },
  { label: "Beef & Pork", count: 16 },
  { label: "Fish", count: 15 },
  { label: "Vegetarian", count: 34 },
  { label: "Plant-Based", count: 15, active: true },
  { label: "Gluten-Free", count: 13 },
  { label: "Dairy-Free", count: 22 },
];

const FEATURED_RECIPES = [
  {
    name: "Katsu Tofu with Sticky Rice",
    time: "30 min",
    tag: "Plant-Based",
    accent: "from-rose-200 via-amber-100 to-yellow-50",
  },
  {
    name: "Sticky Hoisin Chicken Burger",
    time: "35 min",
    tag: "Chicken",
    accent: "from-orange-200 via-amber-100 to-yellow-50",
  },
  {
    name: "Cauliflower Pav Bhaji",
    time: "30 min",
    tag: "Vegetarian",
    accent: "from-amber-200 via-orange-100 to-amber-50",
  },
  {
    name: "Crispy Teriyaki Tofu",
    time: "35 min",
    tag: "Plant-Based",
    accent: "from-stone-200 via-rose-100 to-amber-50",
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

  return (
    <div className="bg-background">
      <section className="border-b border-card-border bg-[#e11d2e] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-2xl font-black tracking-tight">
            <span className="rounded bg-white/15 px-2 py-0.5 text-base">🍽️</span>
            <span>My Meal Plan</span>
          </div>
          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] md:flex">
            <span>Choose meals</span>
            <span>Local shops</span>
            <span>Save progress</span>
          </div>
          <Link
            href="/preview"
            className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
          >
            Get started
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
        <div className="overflow-x-auto pb-3">
          <div className="flex min-w-max items-center gap-2 rounded-full border border-card-border bg-card p-2 shadow-sm">
            {CATEGORY_COUNTS.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  item.active
                    ? "bg-[#e11d2e] text-white"
                    : "bg-transparent text-foreground hover:bg-primary-light/50"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    item.active ? "bg-white/15 text-white" : "bg-black/5 text-muted"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Cooking made simple
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Meals that feel hand-picked for your week.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">
              Build a weekly plan around the food you actually eat, then see the
              cheapest local shop and save your progress on any device.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/preview"
                className="rounded-xl bg-[#e11d2e] px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:brightness-95"
              >
                Get My Meal Plan
              </Link>
              <Link
                href="/sample"
                className="rounded-xl border border-card-border bg-card px-6 py-3.5 text-base font-semibold transition hover:border-primary hover:text-primary"
              >
                View sample
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              Free preview — no signup needed · Prices from {format(7.99)}/month
            </p>
          </div>

          <div className="rounded-3xl border border-card-border bg-card p-4 shadow-lg sm:p-5">
            <div className="flex items-center justify-between border-b border-card-border pb-3">
              <div>
                <p className="text-sm font-semibold">Menu for this week</p>
                <p className="text-xs text-muted">Built for smaller screens too</p>
              </div>
              <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-bold text-accent">
                LIVE
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {FEATURED_RECIPES.map((recipe, index) => (
                <article
                  key={recipe.name}
                  className={`overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br ${recipe.accent}`}
                >
                  <div className="aspect-[4/3] w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.8))] p-4">
                    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/40 bg-white/65 p-4 backdrop-blur-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-semibold text-muted">
                          {recipe.time}
                        </div>
                        <div className="rounded-full bg-[#e11d2e] px-2.5 py-1 text-xs font-bold text-white">
                          {recipe.tag}
                        </div>
                      </div>
                      <div>
                        <div className="mb-3 flex items-end justify-between">
                          <span className="text-4xl">{["🍱", "🍔", "🍛", "🥢"][index]}</span>
                          <span className="text-xs font-semibold text-muted">
                            {index + 1}/4
                          </span>
                        </div>
                        <h2 className="max-w-[14rem] text-lg font-bold leading-tight">
                          {recipe.name}
                        </h2>
                        <p className="mt-2 text-sm text-muted">
                          High-protein, realistic, and easy to shop for.
                        </p>
                      </div>
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
    </div>
  );
}
