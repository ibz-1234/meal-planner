"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getStoresForCountry } from "@/lib/stores";
import { RECIPE_DETAILS } from "@/lib/recipe-details";
import { recipePageHref } from "@/lib/recipes";
import { IconCross, IconClock, IconUsers, IconBasket, IconUtensils } from "@/lib/icons";

export type CardRecipe = {
  name: string;
  time: string;
  tag: string;
  image: string;
};

export default function RecipeDetailModal({
  recipe,
  onClose,
}: {
  recipe: CardRecipe;
  onClose: () => void;
}) {
  const { format } = useCurrency();
  const detail = RECIPE_DETAILS[recipe.name];
  const stores = getStoresForCountry("GB");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={recipe.name}
    >
      <div
        className="hard max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-card sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card text-foreground shadow-sm transition-transform hover:scale-110"
          >
            <IconCross className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              {recipe.tag}
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-muted">
              <IconClock className="h-4 w-4" /> {recipe.time}
            </span>
            {detail && (
              <span className="flex items-center gap-1 text-sm font-semibold text-muted">
                <IconUsers className="h-4 w-4" /> Serves {detail.servings}
              </span>
            )}
          </div>

          <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
            {recipe.name}
          </h2>

          {detail && (
            <>
              <div className="mt-5">
                <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
                  <IconBasket className="h-5 w-5 text-primary" /> Estimated in-store price
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {stores.map((store) => {
                    const cheapest = Math.min(
                      ...stores.map((s) => s.priceIndex)
                    ) === store.priceIndex;
                    return (
                      <div
                        key={store.name}
                        className={`flex items-center justify-between rounded-xl border px-3 py-2 ${
                          cheapest
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
                          {format(detail.baseCostGBP * store.priceIndex)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-muted">
                  Estimated ingredient cost for {detail.servings} serving
                  {detail.servings > 1 ? "s" : ""}. Prices vary by branch and brand.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
                  <IconBasket className="h-5 w-5 text-primary" /> Ingredients
                </h3>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {detail.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
                  <IconUtensils className="h-5 w-5 text-primary" /> Method
                </h3>
                <ol className="mt-3 space-y-4">
                  {detail.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-extrabold text-primary">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-foreground">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}

          {!detail && (
            <p className="mt-4 text-sm text-muted">
              Full recipe details coming soon — sign up free and generate a
              weekly plan to cook this dish.
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <a
              href={recipePageHref(recipe.name)}
              className="btn btn-ghost flex-1"
            >
              Full recipe page
            </a>
            <a
              href="/preview"
              className="btn btn-primary flex-1"
            >
              Plan this week
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
