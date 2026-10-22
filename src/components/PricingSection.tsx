"use client";

import Link from "next/link";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";

const PLANS = [
  {
    name: "Starter",
    priceGBP: 0,
    period: "forever",
    ctaHref: "/signup",
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
    priceGBP: 5.99,
    period: "/month",
    ctaHref: "/checkout?plan=premium",
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
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 ${
                plan.featured
                  ? "hard bg-card"
                  : "hard-sm bg-card"
              }`}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-card-border px-4 py-1 text-xs font-extrabold uppercase tracking-wide ${
                    plan.featured ? "bg-primary text-white" : "bg-secondary text-foreground"
                  }`}
                >
                  {t(plan.badge)}
                </div>
              )}
              <h3 className="font-display text-2xl font-extrabold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold">
                  {format(plan.priceGBP)}
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
                href={plan.ctaHref}
                className={`mt-6 block w-full text-center ${
                  plan.featured ? "btn btn-primary" : "btn btn-ghost"
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
