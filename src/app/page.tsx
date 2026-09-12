"use client";

import Image from "next/image";
import Link from "next/link";
import { getRecipeImage } from "@/lib/meal-images";
import { slugify, getMealBySlug } from "@/lib/meal-data";
import { recipeServingCostGBP } from "@/lib/grocery-prices";
import { useCurrency } from "@/contexts/CurrencyContext";
import PricingSection from "@/components/PricingSection";

const FEATURED_RECIPES = [
  {
    name: "Szechuan Chicken Stir-Fry",
    tag: "High protein",
    note: "Our pick",
    time: 25,
    cost: 2.98,
    protein: 34,
    rating: 4.8,
    description: "Crispy chicken, colourful veg and a sticky soy-chilli glaze over jasmine rice.",
  },
  {
    name: "Miso Glazed Salmon Bowl",
    tag: "Pescatarian",
    note: "Good for leftovers",
    time: 20,
    cost: 3.58,
    protein: 32,
    rating: 4.7,
    description: "Pan-seared salmon with miso, sesame greens and a bed of short-grain rice.",
  },
  {
    name: "Roasted Sweet Potato Buddha Bowl",
    tag: "Plant-based",
    note: "Under £3",
    time: 30,
    cost: 2.69,
    protein: 18,
    rating: 4.8,
    description: "Roasted sweet potato, chickpeas, avocado and a lemon-tahini dressing.",
  },
  {
    name: "Smoky Black Bean Tacos",
    tag: "Family favourite",
    note: "Quick",
    time: 35,
    cost: 3.32,
    protein: 22,
    rating: 4.9,
    description: "Spiced black beans, quick salsa and pickled cabbage in warm tortillas.",
  },
];

const STORES = [
  { name: "Aldi", price: 39.6, badge: "Cheapest" },
  { name: "Asda", price: 43.1 },
  { name: "Tesco", price: 47.2 },
  { name: "Sainsbury's", price: 49.8 },
];

const STEPS = [
  { num: "01", title: "Tell us about your household", body: "Dietary needs, budget, how many people and how much time you have." },
  { num: "02", title: "We plan your meals", body: "Chef picks recipes that share ingredients, so you buy less and waste less." },
  { num: "03", title: "Buy the cheapest basket", body: "Compare Tesco, Aldi, Lidl, Asda, Morrisons and Sainsbury's in one tap." },
  { num: "04", title: "Cook", body: "Step-by-step recipes, timings and tips for using up what you already have." },
];

const PANTRY_SUGGESTIONS = [
  { name: "Chicken & roasted potatoes", tag: "Uses 3 ingredients" },
  { name: "Spanish omelette", tag: "Uses eggs + potatoes" },
  { name: "Cheesy potato & egg skillet", tag: "Uses leftovers" },
];

function Star({ className }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function Home() {
  const { format } = useCurrency();

  // Costs are computed from the same pack-price data as the recipe pages, so
  // the homepage figures can never drift from the detail view.
  const servingCost = (name: string): number | null => {
    const meal = getMealBySlug(slugify(name));
    return meal ? recipeServingCostGBP(meal) : null;
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-card-border bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-semibold text-primary">Chef.ai</p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
              Plan dinner. Sort the shopping. Get on with your week.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
              Tell us what you like to eat, how much you want to spend and how many people you&apos;re feeding. Chef builds a week of dinners and a shopping list around the supermarkets you already use.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/preview" className="btn-primary">
                Build my week →
              </Link>
              <Link
                href="/plan"
                className="rounded-lg border border-card-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary hover:text-primary"
              >
                View demo plan
              </Link>
            </div>
            <p className="mt-4 inline-block hand text-2xl text-primary rotate-[-3deg]">Dinner sorted →</p>
          </div>

          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-xl lg:order-2">
            <Image
              src="/meal-katsu.jpg"
              alt="Golden chicken katsu curry with rice and pickled vegetables"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
              5 dinners · 2 people · £45 estimated
            </div>
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section id="recipes" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">This week&apos;s dinners</p>
              <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Meals you&apos;ll want to cook</h2>
            </div>
            <Link href="/preview" className="text-sm font-semibold text-primary hover:underline">Build your own plan →</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {FEATURED_RECIPES.map((recipe) => (
              <Link
                key={recipe.name}
                href={`/recipe/${slugify(recipe.name)}`}
                className="group block"
              >
                <article className="card h-full overflow-hidden transition hover:shadow-lg">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={getRecipeImage(recipe.name)}
                      alt={recipe.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className="rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">{recipe.note}</span>
                      <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-white shadow-sm">{recipe.tag}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1 text-secondary">
                        <Star className="h-3.5 w-3.5" /> {recipe.rating}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {recipe.time} min
                      </span>
                      <span>·</span>
                      <span>{recipe.protein}g protein</span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl font-bold group-hover:text-primary transition-colors">{recipe.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{recipe.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="font-serif text-2xl font-bold text-foreground">{format(servingCost(recipe.name) ?? recipe.cost)} <span className="text-sm font-normal text-muted">/ serving</span></p>
                      <span className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-semibold text-foreground transition group-hover:border-primary group-hover:text-primary">View recipe</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Supermarket comparison */}
      <section className="border-y border-card-border bg-secondary-light/30 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold text-primary">Your weekly shop</p>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">We compare every basket, so you don&apos;t have to.</h2>
          </div>

          <div className="card divide-y divide-card-border">
            {STORES.map((store, i) => (
              <div
                key={store.name}
                className={`flex items-center justify-between px-5 py-4 first:rounded-t-xl last:rounded-b-xl ${i === 0 ? "bg-white" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold ${i === 0 ? "bg-primary text-white" : "bg-card-border/50 text-muted"}`}>
                    {i + 1}
                  </span>
                  <span className="font-semibold text-foreground">{store.name}</span>
                  {store.badge && (
                    <span className="rounded-md bg-primary px-2 py-1 text-xs font-semibold text-white">{store.badge}</span>
                  )}
                </div>
                <span className={`font-serif text-xl font-bold ${i === 0 ? "text-primary" : "text-foreground"}`}>{format(store.price)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl bg-card p-5 shadow-sm sm:flex-row">
            <div>
              <p className="text-sm text-muted">Switching to Aldi would save</p>
              <p className="font-serif text-3xl font-bold text-primary">{format(7.6)} <span className="text-base font-normal text-muted">vs Tesco</span></p>
            </div>
            <Link href="/plan" className="rounded-lg border border-card-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">
              See my shopping list →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold sm:text-4xl">How Chef.ai works</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.num} className="relative">
                <span className="font-serif text-5xl font-bold text-primary/15">{step.num}</span>
                <h3 className="mt-2 font-serif text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use what you have */}
      <section className="border-y border-card-border bg-accent-light/20 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-primary">Use what you already have</p>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Got eggs, potatoes and spinach?</h2>
            <p className="mt-4 max-w-md text-muted">Tell Chef what&apos;s in your fridge and it&apos;ll build meals around it before it goes to waste.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["carrots", "potatoes", "chicken", "eggs", "cheese"].map((item) => (
                <span key={item} className="rounded-md bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm">{item}</span>
              ))}
            </div>
            <Link href="/preview" className="btn-primary mt-6 inline-flex">See what we&apos;d make →</Link>
          </div>
          <div className="space-y-3">
            {PANTRY_SUGGESTIONS.map((meal) => (
              <div key={meal.name} className="flex items-center justify-between rounded-xl border border-card-border bg-card p-4 shadow-sm">
                <div>
                  <p className="font-serif text-lg font-bold">{meal.name}</p>
                  <p className="text-xs text-muted">{meal.tag}</p>
                </div>
                <span className="rounded-md bg-secondary-light px-2.5 py-1 text-xs font-semibold text-secondary">Use up</span>
              </div>
            ))}
            <p className="hand text-center text-2xl text-primary rotate-[-2deg]">You&apos;d use 87% of those ingredients</p>
          </div>
        </div>
      </section>

      {/* Real kitchens */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-foreground px-6 py-14 text-background sm:px-12 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">Made for actual kitchens.</h2>
              <ul className="mt-6 space-y-4 text-lg leading-relaxed text-background/80">
                <li>Forgot to buy coriander? No problem.</li>
                <li>Got half a chicken left from Tuesday? We&apos;ll find something to do with it.</li>
                <li>Trying to feed four people for £50? We&apos;ve got you.</li>
              </ul>
              <Link href="/preview" className="mt-8 inline-flex rounded-lg bg-background px-6 py-3 font-semibold text-foreground transition hover:bg-white">Build a real week →</Link>
            </div>
            <div className="relative hidden aspect-square overflow-hidden rounded-xl lg:block">
              <Image src="/meal-prepped.jpg" alt="A kitchen counter with prepped vegetables and herbs" fill sizes="280px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* Final CTA */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">Stop wondering what&apos;s for dinner.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">Your first personalised week is ready in under a minute. No credit card needed.</p>
          <Link href="/preview" className="btn-primary mt-6 inline-flex">Build my week →</Link>
        </div>
      </section>
    </div>
  );
}
