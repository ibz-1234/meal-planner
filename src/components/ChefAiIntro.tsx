"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PlanNarrative } from "@/lib/ai-copy";
import { useCurrency } from "@/contexts/CurrencyContext";

function useTypewriter(text: string, speed = 12): string {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return text.slice(0, count);
}

export default function ChefAiIntro({
  narrative,
  premium,
}: {
  narrative: PlanNarrative;
  premium: boolean;
}) {
  const { format } = useCurrency();
  const typed = useTypewriter(narrative.coachNote);
  const done = typed.length === narrative.coachNote.length;

  return (
    <section className="mb-6 rounded-2xl border border-card-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-xl">
          👨‍🍳
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Chef AI · personalised for you
          </p>
          <h2 className="text-xl font-bold">{narrative.title}</h2>
        </div>
      </div>

      <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-foreground">
        {typed}
        {!done && <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-accent align-middle" />}
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {narrative.whyItWorks.map((point) => (
          <div key={point} className="rounded-xl bg-background p-3 text-xs text-muted">
            <span className="mr-1 text-accent">✓</span>
            {point}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-primary-light/60 p-4">
        <div>
          <p className="text-xs font-semibold text-primary">Versus takeaway, this week saves you</p>
          <p className="text-2xl font-extrabold text-primary">
            {format(narrative.projectedMonthlySaving)}
            <span className="ml-1 text-sm font-medium text-muted">/ month</span>
          </p>
        </div>
        {!premium && (
          <Link
            href="/upgrade"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-dark"
          >
            Unlock the full week →
          </Link>
        )}
      </div>
      {!premium && (
        <p className="mt-3 text-xs italic text-muted">{narrative.premiumHook}</p>
      )}
    </section>
  );
}
