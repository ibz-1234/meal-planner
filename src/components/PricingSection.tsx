"use client";

import Link from "next/link";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";

const PLANS = [
  {
    name: "Starter",
    priceGBP: 0,
    period: "forever",
    tagline: "Try the kitchen before you commit.",
    features: [
      "3 AI meal plans per month",
      "Basic shopping list by aisle",
      "3 dietary preferences",
      "Local shop price comparison",
      "7-day preview with 2 days unlocked",
    ],
    cta: "Start free",
    featured: false,
    badge: null as string | null,
  },
  {
    name: "Premium",
    priceGBP: 7.99,
    period: "/month",
    tagline: "For people who want the weekly shop handled.",
    features: [
      "Unlimited AI meal plans, refreshed weekly",
      "Chef AI writes every recipe intro & selling point",
      "Smart shopping lists grouped by supermarket aisle",
      "Live cheapest-store alerts when prices drop",
      "Macro, calorie & nutrition dashboard",
      "Pantry \"use-it-up\" planner to cut waste",
      "One-tap smart swaps with budget lock",
      "Leftover rescue — turn extras into tomorrow's meal",
      "PDF export of plans, lists & recipes",
      "Save & sync across all your devices",
      "Priority support & new recipe previews",
    ],
    cta: "Start 14-day free trial",
    featured: true,
    badge: "pricing.mostPopular",
  },
  {
    name: "Family",
    priceGBP: 12.99,
    period: "/month",
    tagline: "One plan that feeds the whole table.",
    features: [
      "Everything in Premium",
      "Up to 8 family profiles with custom portions",
      "Shared shopping lists updated in real time",
      "Batch-cook mode with bulk scaling",
      "Kid-friendly AI swaps & hide-the-veg ideas",
      "Per-person nutrition targets",
      "Weekly household budget tracker",
      "Dedicated family support channel",
    ],
    cta: "Start 14-day free trial",
    featured: false,
    badge: "pricing.bestValue",
  },
];

export default function PricingSection() {
  const { format } = useCurrency();
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold">{t("pricing.title")}</h2>
          <p className="mt-3 text-muted">{t("pricing.subtitle")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 transition-all hover:shadow-lg ${
                plan.featured
                  ? "border-primary bg-card shadow-md sm:scale-105"
                  : "border-card-border bg-card"
              }`}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-xs font-bold text-white ${
                    plan.featured ? "bg-primary" : "bg-foreground/80"
                  }`}
                >
                  {t(plan.badge)}
                </div>
              )}
              <h3 className="font-serif text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-serif text-4xl font-extrabold">
                  {plan.priceGBP === 0 ? format(0) : format(plan.priceGBP)}
                </span>
                <span className="text-muted">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.priceGBP === 0 ? "/signup" : "/upgrade"}
                className={`mt-6 block w-full rounded-xl py-3 text-center text-sm font-bold transition-all ${
                  plan.featured
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "border border-card-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          {t("pricing.guarantee")}
        </p>
      </div>
    </section>
  );
}
