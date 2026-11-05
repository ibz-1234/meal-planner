"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { matchMealsByPantry, recipePageHref } from "@/lib/recipes";
import { getMealImage } from "@/lib/meal-images";
import { IconBasket, IconClock, IconCross, IconUtensils } from "@/lib/icons";

const SUGGESTIONS = [
  "chicken", "eggs", "rice", "pasta", "tofu", "spinach", "salmon",
  "lentils", "cheese", "tomato", "potato", "bread", "yogurt", "avocado",
];

export default function PantryPage() {
  const [input, setInput] = useState("");
  const [have, setHave] = useState<string[]>([]);

  const results = useMemo(() => matchMealsByPantry(have), [have]);

  const addItem = (raw: string) => {
    const item = raw.trim().toLowerCase();
    if (item && !have.includes(item)) setHave((h) => [...h, item]);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="kicker text-primary">Use what you have</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        What&apos;s in your kitchen?
      </h1>
      <p className="mt-3 max-w-xl text-lg text-muted">
        Type the ingredients you already have and we&apos;ll show the meals you
        can make — and exactly what&apos;s missing for each.
      </p>

      <form
        className="hard-sm mt-6 flex gap-2 rounded-2xl bg-card p-3"
        onSubmit={(e) => {
          e.preventDefault();
          addItem(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. chicken, rice, eggs…"
          className="flex-1 rounded-xl border border-card-border bg-background px-4 py-3 text-sm font-medium outline-none focus:border-primary"
        />
        <button type="submit" className="btn btn-primary !py-3">
          Add
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.filter((s) => !have.includes(s)).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => addItem(s)}
            className="rounded-full border border-card-border bg-card px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-primary hover:text-primary"
          >
            + {s}
          </button>
        ))}
      </div>

      {have.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {have.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white"
            >
              {item}
              <button
                type="button"
                aria-label={`Remove ${item}`}
                onClick={() => setHave((h) => h.filter((x) => x !== item))}
              >
                <IconCross className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {have.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-2xl font-extrabold">
            You can make {results.length} meal
            {results.length === 1 ? "" : "s"}
          </h2>
          <div className="mt-4 space-y-3">
            {results.map(({ meal, matched, missing, score }) => (
              <Link
                key={meal.name}
                href={recipePageHref(meal.name)}
                className="hard-sm flex gap-4 overflow-hidden rounded-2xl bg-card transition-transform hover:-translate-y-0.5"
              >
                <div className="relative h-24 w-32 shrink-0 sm:h-28 sm:w-40">
                  <Image
                    src={getMealImage(meal.type, meal.name)}
                    alt={meal.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 py-3 pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-extrabold leading-tight">
                      {meal.name}
                    </h3>
                    <span className="flex items-center gap-1 text-xs font-semibold text-muted">
                      <IconClock className="h-3.5 w-3.5" /> {meal.prepTime} min
                    </span>
                    <span className="rounded-full bg-primary-light px-2 py-0.5 text-xs font-bold text-primary">
                      {Math.round(score * 100)}% covered
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-1 text-xs text-muted">
                    <IconBasket className="mr-1 inline h-3.5 w-3.5" />
                    {matched.join(", ")}
                  </p>
                  {missing.length > 0 && (
                    <p className="mt-1 line-clamp-1 text-xs text-muted">
                      Still need: {missing.join(", ")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {have.length === 0 && (
        <div className="mt-10 rounded-2xl border-2 border-dashed border-card-border p-10 text-center text-muted">
          <IconUtensils className="mx-auto h-10 w-10 text-primary/40" />
          <p className="mt-3 text-sm">
            Add a few ingredients to see what you can cook tonight.
          </p>
        </div>
      )}
    </div>
  );
}
