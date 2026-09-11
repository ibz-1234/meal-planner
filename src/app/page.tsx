"use client";

import Image from "next/image";
import Link from "next/link";
import { getRecipeImage } from "@/lib/meal-images";
import { useCurrency } from "@/contexts/CurrencyContext";
import PricingSection from "@/components/PricingSection";

const SUGGESTED_STORES = [
  { store: "Aldi", price: 38.6, saving: 4.2, badge: "Cheapest" },
  { store: "Asda", price: 43.1, saving: 0.0 },
  { store: "Tesco", price: 47.2, saving: 0.0 },
  { store: "Sainsbury's", price: 49.8, saving: 0.0 },
];

const FEATURED_RECIPES = [
  { name: "Crispy Tofu & Sesame Greens", tag: "Plant-based", time: 30, cost: 2.84, protein: 18, rating: 4.8 },
  { name: "Creamy Tuscan Chicken", tag: "High protein", time: 25, cost: 3.4, protein: 36, rating: 4.9 },
  { name: "Salmon & Miso Rice Bowl", tag: "Pescatarian", time: 20, cost: 3.75, protein: 32, rating: 4.7 },
  { name: "Spicy Chicken Fajita Bowls", tag: "Family favourite", time: 35, cost: 3.1, protein: 34, rating: 4.8 },
];

function Star({ className }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Home() {
  const { format } = useCurrency();

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-primary-light/40 blur-3xl" />
          <div className="absolute -left-20 top-1/2 h-[30rem] w-[30rem] rounded-full bg-accent-light/40 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent" /> AI meal planner + UK supermarket prices
            </p>
            <h1 className="font-serif text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Your whole week of food.{" "}
              <span className="text-primary">Sorted.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              AI meal plans, real UK supermarket prices and less food waste — all in one beautiful dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/preview" className="btn-primary">
                Build my week →
              </Link>
              <Link
                href="/plan"
                className="inline-flex items-center justify-center rounded-full border border-card-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-white hover:shadow-sm"
              >
                View demo plan
              </Link>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-2 border-t border-card-border pt-8">
              {[
                { label: "Estimated shop", value: format(42.6) },
                { label: "Days planned", value: "7" },
                { label: "Potential saving", value: format(8.4) },
              ].map((stat, i) => (
                <div key={stat.label} className={`${i > 0 ? "border-l border-card-border pl-4" : ""}`}>
                  <p className="font-serif text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted">
              No credit card · Cancel anytime · 2-day full preview
            </p>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl">
              <Image
                src="/meal-greek-bowl.jpg"
                alt="A colourful chef-prepared Greek bowl with chicken, rice and fresh vegetables"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover animate-slow-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-8 -left-6 hidden rounded-2xl bg-card p-5 shadow-xl sm:block animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
              <p className="text-xs font-semibold text-muted">This week&apos;s basket</p>
              <p className="font-serif text-3xl font-bold text-primary">{format(38.6)}</p>
              <p className="text-xs text-accent font-medium">at Aldi</p>
            </div>
            <div className="absolute -right-4 top-8 hidden rounded-2xl bg-primary p-4 text-white shadow-xl sm:block animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <p className="text-xs font-semibold text-primary-light">Chef found a saving</p>
              <p className="font-serif text-2xl font-bold">{format(4.2)}</p>
              <p className="text-xs text-primary-light">vs Tesco</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured restaurant-style cards */}
      <section id="recipes" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">Chef&apos;s picks</p>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Meals you&apos;ll want to cook
              </h2>
            </div>
            <Link href="/preview" className="text-sm font-semibold text-primary hover:underline">
              Build your own plan →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_RECIPES.map((recipe) => (
              <article
                key={recipe.name}
                className="card group cursor-pointer overflow-hidden hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getRecipeImage(recipe.name)}
                    alt={recipe.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
                    {recipe.tag}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold leading-tight">{recipe.name}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span className="flex items-center gap-1 text-amber-600">
                      <Star className="h-3.5 w-3.5" /> {recipe.rating}
                    </span>
                    <span>·</span>
                    <span>{recipe.time} min</span>
                    <span>·</span>
                    <span>{recipe.protein}g protein</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="font-serif text-2xl font-bold text-primary">{format(recipe.cost)}</p>
                    <span className="text-xs text-muted">per serving</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Supermarket comparison hero */}
      <section className="relative bg-primary px-4 py-20 text-white sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold text-primary-light">Your weekly shop</p>
            <h2 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              We compare every basket, so you don&apos;t have to.
            </h2>
          </div>

          <div className="space-y-3">
            {SUGGESTED_STORES.map((s, i) => (
              <div
                key={s.store}
                className={`flex items-center justify-between rounded-2xl px-6 py-5 transition ${
                  i === 0
                    ? "bg-white text-foreground shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                      i === 0 ? "bg-primary text-white" : "bg-white/20"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="font-semibold text-base">{s.store}</span>
                  {s.badge && (
                    <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white">
                      {s.badge}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className={`font-serif text-2xl font-bold ${i === 0 ? "text-primary" : ""}`}>
                    {format(s.price)}
                  </p>
                  {s.saving > 0 && (
                    <p className="text-xs text-accent font-medium">Save {format(s.saving)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/preview"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-sm transition hover:bg-primary-light"
            >
              Find my cheapest shop →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold text-primary">How Chef.ai works</p>
            <h2 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">From fridge to fork in four steps</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", title: "Tell Chef your goals", body: "Budget, dietary needs, household size and cooking skill." },
              { num: "02", title: "Chef builds your week", body: "AI chooses meals that share ingredients and save time." },
              { num: "03", title: "Shop the cheapest stores", body: "Real UK supermarket basket comparisons in one tap." },
              { num: "04", title: "Cook with confidence", body: "Step-by-step recipes, macros and waste-saving tips." },
            ].map((step) => (
              <div key={step.num} className="card p-7 hover:-translate-y-1 hover:shadow-lg">
                <span className="font-serif text-4xl font-bold text-primary/20">{step.num}</span>
                <h3 className="mt-4 font-serif text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* Final CTA */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-primary px-6 py-14 text-center text-white sm:py-20 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-0 bg-[url('/meal-greek-bowl.jpg')] bg-cover bg-center opacity-10" />
          <div className="relative z-10">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">Stop wondering what&apos;s for dinner.</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-light">
              Your first personalised week is ready in under a minute. No subscription required to preview it.
            </p>
            <Link href="/preview" className="btn-primary mt-8">
              Build my week →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
