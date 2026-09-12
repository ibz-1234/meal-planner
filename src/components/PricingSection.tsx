"use client";

import Link from "next/link";
import { useCurrency } from "@/contexts/CurrencyContext";

const PLANS = [
  {
    name: "Start cooking for free",
    priceGBP: 0,
    period: "",
    tagline: "Try the kitchen before you commit.",
    features: ["3 plans every month", "Shopping list", "Basic price comparison"],
    cta: "Try it free",
    href: "/signup",
    featured: false,
  },
  {
    name: "Chef.ai+",
    priceGBP: 7.99,
    period: "/month",
    tagline: "For people who want the weekly shop handled.",
    features: ["Unlimited plans", "Price comparison", "Nutrition", "Leftover planner", "Smart swaps"],
    cta: "Start 14-day trial",
    href: "/upgrade",
    featured: true,
  },
];

export default function PricingSection() {
  const { format } = useCurrency();

  return (
    <section id="pricing" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">Simple pricing</h2>
          <p className="mt-3 text-muted">Start free. Upgrade when Chef is saving you time every week.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`card p-7 ${plan.featured ? "border-primary/30 ring-1 ring-primary/10" : ""}`}
            >
              <h3 className="font-serif text-2xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-serif text-5xl font-bold tracking-tight">{plan.priceGBP === 0 ? "Free" : format(plan.priceGBP)}</span>
                <span className="text-muted">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-muted">{feature}</li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-primary text-white shadow-sm hover:bg-primary-dark"
                    : "border border-card-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">Cancel anytime. 14-day money-back guarantee.</p>
      </div>
    </section>
  );
}
