"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTier, type Tier } from "@/lib/subscription";
import { useCurrency } from "@/contexts/CurrencyContext";

const OPTIONS: { tier: Tier; name: string; priceGBP: number; blurb: string; perks: string[] }[] = [
  {
    tier: "starter",
    name: "Free",
    priceGBP: 0,
    blurb: "Try the kitchen before you commit.",
    perks: [
      "3 plans every month",
      "Shopping list",
      "Basic price comparison",
    ],
  },
  {
    tier: "premium",
    name: "Chef.ai+",
    priceGBP: 7.99,
    blurb: "For people who want the weekly shop handled.",
    perks: [
      "Unlimited plans",
      "Full price comparison across six supermarkets",
      "Nutrition and macros on every recipe",
      "Leftover planner that carries ingredients across the week",
      "One-tap smart swaps",
    ],
  },
];

export default function UpgradePage() {
  const router = useRouter();
  const { format } = useCurrency();
  const [selected, setSelected] = useState<Tier>("premium");
  const [confirming, setConfirming] = useState(false);

  const chosen = OPTIONS.find((o) => o.tier === selected)!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-primary">
        Chef.ai+
      </p>
      <h1 className="mt-3 text-center text-3xl font-bold sm:text-4xl">
        Stop deciding what&apos;s for dinner. Forever.
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted">
        Your free plan already shows two days. Chef.ai+ unlocks the rest, keeps it priced
        at your shop and rewrites it as your week changes.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.tier}
            type="button"
            onClick={() => setSelected(opt.tier)}
            className={`rounded-2xl border p-6 text-left transition-all ${
              selected === opt.tier
                ? "border-primary bg-card shadow-md ring-2 ring-primary/30"
                : "border-card-border bg-card hover:border-primary"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold">{opt.name}</h2>
              <span className="text-2xl font-extrabold">
                {format(opt.priceGBP)}
                {opt.priceGBP > 0 && <span className="text-sm font-medium text-muted">/mo</span>}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{opt.blurb}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {opt.perks.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span className="text-muted">{p}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-card-border bg-card p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Today</span>
          <span className="font-bold">{format(0)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted">After 14-day trial</span>
          <span className="font-bold">
            {format(chosen.priceGBP)} / month
          </span>
        </div>
        <button
          type="button"
          disabled={confirming}
          onClick={() => {
            setConfirming(true);
            setTier(selected);
            setTimeout(() => router.push("/plan"), 600);
          }}
          className="mt-5 w-full rounded-xl bg-primary py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-primary-dark disabled:opacity-70"
        >
          {confirming ? "Unlocking your week…" : chosen.priceGBP === 0 ? "Continue with Free" : `Start 14-day trial of ${chosen.name}`}
        </button>
        <p className="mt-3 text-center text-xs text-muted">
          No card required for the demo. 14-day free trial, then cancel any time.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-card-border bg-card p-6 text-center">
        <p className="text-sm font-medium text-foreground">
          “I saved more on my first Aldi shop than the whole month costs.”
        </p>
        <p className="mt-1 text-xs text-muted">Sophie M. · Leeds · Chef.ai+ member</p>
        <div className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-primary">
          <span>⭐ 4.9/5</span>
          <span className="text-muted">from 2,000+ early users</span>
        </div>
      </div>
    </div>
  );
}
