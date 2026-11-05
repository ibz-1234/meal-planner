import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allRecipeSlugs, getRecipeBySlug } from "@/lib/recipes";
import { getStoresForCountry } from "@/lib/stores";
import {
  IconBasket,
  IconClock,
  IconLeaf,
  IconUsers,
  IconUtensils,
} from "@/lib/icons";

export function generateStaticParams() {
  return allRecipeSlugs().map((slug) => ({ slug }));
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const stores = getStoresForCountry("GB");
  const totalCost = recipe.baseCostGBP;
  const cheapestIndex = Math.min(...stores.map((s) => s.priceIndex));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="text-sm font-semibold text-primary underline-offset-2 hover:underline"
      >
        ← Back to recipes
      </Link>

      <div className="hard mt-4 overflow-hidden rounded-3xl bg-card">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              {recipe.type}
            </span>
            {recipe.prepTime != null && (
              <span className="flex items-center gap-1 text-sm font-semibold text-muted">
                <IconClock className="h-4 w-4" /> {recipe.prepTime} min
              </span>
            )}
            {recipe.servings != null && (
              <span className="flex items-center gap-1 text-sm font-semibold text-muted">
                <IconUsers className="h-4 w-4" /> Serves {recipe.servings}
              </span>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            {recipe.name}
          </h1>

          {recipe.calories != null && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[
                { label: "Calories", value: `${recipe.calories}` },
                { label: "Protein", value: `${recipe.protein}g` },
                { label: "Carbs", value: `${recipe.carbs}g` },
                { label: "Fat", value: `${recipe.fat}g` },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-card-border bg-background p-3 text-center"
                >
                  <p className="text-xs text-muted">{s.label}</p>
                  <p className="font-display text-lg font-extrabold">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {totalCost != null && (
            <div className="mt-6">
              <h2 className="flex items-center gap-2 font-display text-xl font-extrabold">
                <IconBasket className="h-5 w-5 text-primary" /> Estimated
                in-store price
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {stores.map((store) => (
                  <div
                    key={store.name}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2 ${
                      store.priceIndex === cheapestIndex
                        ? "border-accent bg-accent-light"
                        : "border-card-border bg-background"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-extrabold text-white"
                        style={{ backgroundColor: store.color }}
                      >
                        {store.name.charAt(0)}
                      </span>
                      {store.name}
                    </span>
                    <span className="text-sm font-extrabold">
                      £{(totalCost * store.priceIndex).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-extrabold">
              <IconBasket className="h-5 w-5 text-primary" /> Ingredients
            </h2>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {recipe.ingredients.map((ing) => (
                <li
                  key={ing.label}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <span className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    {ing.label}
                  </span>
                  {ing.cost != null && (
                    <span className="font-semibold text-muted">
                      £{ing.cost.toFixed(2)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-extrabold">
              <IconUtensils className="h-5 w-5 text-primary" /> Method
            </h2>
            <ol className="mt-3 space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-extrabold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {recipe.wasteTip && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-card-border bg-secondary-light p-4">
              <IconLeaf className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm">{recipe.wasteTip}</p>
            </div>
          )}

          <Link href="/preview" className="btn btn-primary mt-7 w-full">
            Build a week of meals like this
          </Link>
        </div>
      </div>
    </div>
  );
}
