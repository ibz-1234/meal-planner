"use client";

import Link from "next/link";
import Image from "next/image";
import type { DayPlan, UserPreferences } from "@/lib/types";
import { dayTeaser, describeMeal } from "@/lib/ai-copy";
import { getMealImage } from "@/lib/meal-images";

export default function LockedDay({
  day,
  preferences,
}: {
  day: DayPlan;
  preferences: UserPreferences;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-card-border bg-card">
      <div className="space-y-3 p-4 blur-[3px] select-none" aria-hidden>
        {day.meals.map((meal) => {
          const copy = describeMeal(meal, preferences);
          return (
            <div key={meal.name} className="flex gap-4 rounded-xl border border-card-border p-3">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={getMealImage(meal.type, meal.name)}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs uppercase text-muted">{meal.type}</p>
                <p className="font-semibold">{copy.headline}</p>
                <p className="text-sm text-muted">{copy.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-card/30 via-card/85 to-card p-6 text-center">
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Premium preview
        </span>
        <p className="mt-4 max-w-md text-base font-semibold text-foreground">
          {dayTeaser(day, preferences)}
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Chef AI has already written {day.meals.length} recipes for {day.day}, with the
          shopping list priced at your store. Unlock all seven days to see them.
        </p>
        <Link
          href="/upgrade"
          className="mt-5 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-dark"
        >
          Unlock {day.day} and the rest of the week
        </Link>
        <p className="mt-2 text-xs text-muted">14-day free trial · cancel any time</p>
      </div>
    </div>
  );
}
