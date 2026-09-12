"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
    <section className="card mb-6 overflow-hidden">
      <div className="relative bg-primary p-6 text-white sm:p-8">
        <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-6 translate-y-6 rounded-full bg-white/5" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 p-1.5 backdrop-blur-sm">
            <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
              Chef AI
            </p>
            <h2 className="font-serif text-xl font-bold sm:text-2xl">{narrative.title}</h2>
          </div>
        </div>

        <p className="relative mt-4 min-h-[4rem] max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">
          {typed}
          {!done && <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-white align-middle" />}
        </p>
      </div>

      <div className="grid gap-px bg-card-border sm:grid-cols-3">
        {narrative.whyItWorks.map((point, i) => (
          <div
            key={point}
            className={`bg-card p-4 text-sm leading-relaxed text-muted ${
              i === 0 ? "sm:rounded-bl-2xl" : i === 2 ? "sm:rounded-br-2xl" : ""
            }`}
          >
            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
              {i + 1}
            </span>
            {point}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-card-border bg-primary-light/40 p-5">
        <div>
          <p className="text-xs font-semibold text-primary">Versus takeaway, this week saves you</p>
          <p className="font-serif text-2xl font-extrabold text-primary">
            {format(narrative.projectedMonthlySaving)}
            <span className="ml-1 text-sm font-medium text-muted">/ month</span>
          </p>
        </div>
        {!premium && (
          <Link
            href="/upgrade"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark"
          >
            Unlock the full week →
          </Link>
        )}
      </div>
      {!premium && (
        <p className="border-t border-card-border px-5 py-3 text-sm italic text-muted">
          {narrative.premiumHook}
        </p>
      )}
    </section>
  );
}
