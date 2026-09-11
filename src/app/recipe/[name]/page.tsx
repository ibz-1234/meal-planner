import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMealBySlug, MEAL_SLUGS } from "@/lib/meal-data";
import { getMealImage } from "@/lib/meal-images";
import { getProduct, formatProductAmount, getIngredientFraction } from "@/lib/grocery-prices";

const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export async function generateStaticParams() {
  return MEAL_SLUGS.map((name) => ({ name }));
}

export default async function RecipePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const meal = getMealBySlug(name);
  if (!meal) {
    notFound();
  }

  const totalCost = meal.ingredients.reduce((sum, ing) => sum + ing.estimatedCost, 0);
  const selectedStore = "Aldi";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero image */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image
          src={getMealImage(meal.type, meal.name)}
          alt={meal.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-10 p-4 sm:p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Back
          </Link>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-10 sm:px-6 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 19h12M6 19c0-2.5 2-4.5 4.5-4.5h3c2.5 0 4.5 2 4.5 4.5M9 14.5c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5" /></svg> {meal.type}
            </span>
            <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {meal.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/90">
              <span className="flex items-center gap-1 font-medium">
                <svg className="h-4 w-4 text-secondary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> 4.8
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {meal.prepTime} min
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 7.78 16.67 10.83a4 4 0 011.17-1.17 6 6 0 00-.2 8.196z" /></svg> {meal.calories} kcal
              </span>
              <span>·</span>
              <span className="font-serif text-lg font-bold text-secondary">{formatter.format(totalCost)}</span>
              <span className="text-white/70">per serving</span>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* Left column */}
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-2xl font-bold">How to make it</h2>
            <ol className="mt-6 space-y-5">
              {meal.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary font-serif text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>

            {meal.wasteReductionTip && (
              <div className="mt-10 rounded-2xl bg-primary-light/30 p-6">
                <p className="text-sm font-semibold text-primary">Chef&apos;s waste-saver tip</p>
                <p className="mt-2 text-foreground">{meal.wasteReductionTip}</p>
              </div>
            )}

            <div className="mt-10 rounded-2xl border border-card-border bg-card p-6">
              <h3 className="font-serif text-xl font-bold">Why Chef chose this meal</h3>
              <p className="mt-3 text-muted leading-relaxed">
                A {meal.prepTime}-minute {meal.type} built around {meal.ingredients
                  .slice(0, 3)
                  .map((i) => i.name.toLowerCase())
                  .join(", ")}
                . It balances {meal.protein}g of protein, {meal.carbs}g of carbs and {meal.fat}g of fat — so
                you eat well without overspending.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold">What you need</h2>
              <p className="mt-1 text-xs text-muted">
                Prices shown are per-serving estimates matched to real {selectedStore} packs.
              </p>
              <ul className="mt-5 space-y-4">
                {meal.ingredients.map((ing) => {
                  const product = getProduct(ing.name, selectedStore);
                  return (
                    <li key={ing.name} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {ing.quantity} {ing.unit} {ing.name}
                        </p>
                        {product && (
                          <p className="mt-0.5 text-xs text-muted">
                            {product.productName} · {formatProductAmount(getIngredientFraction(ing.name) * product.packAmount, product.unit)} used
                          </p>
                        )}
                      </div>
                      <span className="whitespace-nowrap font-serif text-lg font-bold text-primary">
                        {formatter.format(ing.estimatedCost)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-card-border pt-4">
                <span className="font-medium text-foreground">Estimated per serving</span>
                <span className="font-serif text-2xl font-bold text-primary">{formatter.format(totalCost)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-primary-light/30 p-4 text-center">
                <p className="text-xs text-muted">Protein</p>
                <p className="mt-1 font-serif text-xl font-bold text-primary">{meal.protein}g</p>
              </div>
              <div className="rounded-2xl bg-secondary-light/30 p-4 text-center">
                <p className="text-xs text-muted">Carbs</p>
                <p className="mt-1 font-serif text-xl font-bold text-secondary">{meal.carbs}g</p>
              </div>
              <div className="rounded-2xl bg-accent-light/30 p-4 text-center">
                <p className="text-xs text-muted">Fat</p>
                <p className="mt-1 font-serif text-xl font-bold text-accent">{meal.fat}g</p>
              </div>
            </div>

            <Link
              href="/preview"
              className="block w-full rounded-full bg-primary py-4 text-center text-lg font-semibold text-white shadow-lg transition hover:bg-primary-dark"
            >
              Build a week with this →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
