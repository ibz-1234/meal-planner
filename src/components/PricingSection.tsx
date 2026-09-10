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
      "3 meal plans per month",
      "Basic shopping list",
      "3 dietary preferences",
      "Local shop price comparison",
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
      "Unlimited meal plans, updated weekly",
      "Smart shopping lists grouped by aisle",
      "Cheapest local shop alerts when prices drop",
      "Full macro & calorie dashboard",
      "Food waste planner — use up what you buy",
      "Swap any meal with one tap",
      "PDF export of plans & shopping lists",
      "Save & sync progress across devices",
      "Priority support",
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
      "Up to 8 family profiles & portions",
      "Shared shopping lists in real time",
      "Batch-cook & bulk recipe scaling",
      "Kid-friendly meal swaps",
      "Weekly budget tracking per household",
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
          <h2 className="text-3xl font-bold">{t("pricing.title")}</h2>
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
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">
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
