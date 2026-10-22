"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PLANS,
  checkoutUrlFor,
  isValidPlan,
  stripeConfigured,
  type PlanId,
} from "@/lib/billing";
import { currentUser } from "@/lib/auth";
import { useCurrency } from "@/contexts/CurrencyContext";

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { format } = useCurrency();
  const planId: PlanId = isValidPlan(params.get("plan"))
    ? (params.get("plan") as PlanId)
    : "premium";
  const reason = params.get("reason");
  const plan = PLANS[planId];
  const [email, setEmail] = useState<string | null>(null);
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [paying, setPaying] = useState(false);
  const liveUrl = checkoutUrlFor(planId, email);

  useEffect(() => {
    setEmail(currentUser()?.email ?? null);
    if (planId === "starter") router.replace("/signup");
  }, [planId, router]);

  if (planId === "starter") return null;

  // Real Stripe Payment Link configured → hand off to Stripe-hosted checkout.
  if (liveUrl) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">
          Taking you to secure checkout…
        </h1>
        <p className="mt-3 text-muted">
          You&apos;re subscribing to {plan.name} ({format(plan.priceGBP)}/month).
          Payment is handled by Stripe.
        </p>
        <a
          href={liveUrl}
          className="mt-6 inline-block w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark"
        >
          Continue to Stripe →
        </a>
        <p className="mt-4 text-xs text-muted">
          Card details are collected by Stripe, never by Mealsmith.
        </p>
      </div>
    );
  }

  // Test mode: no Stripe link configured yet. Simulates a successful payment.
  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      router.push(`/checkout/success?plan=${planId}&source=test`);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      {reason === "limit" && (
        <div className="mb-6 rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm">
          You&apos;ve used your 3 free meal plans this month. Upgrade to keep
          planning — your first 14 days are free.
        </div>
      )}
      <div className="rounded-2xl border border-card-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Mealsmith {plan.name}</h1>
            <p className="text-sm text-muted">
              {format(plan.priceGBP)}/month · cancel anytime
            </p>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
            TEST MODE
          </span>
        </div>

        <form onSubmit={pay} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Card number
            <input
              required
              inputMode="numeric"
              placeholder="4242 4242 4242 4242"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
              className="mt-1 w-full rounded-lg border border-card-border bg-background px-3 py-2.5"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm font-medium">
              Expiry
              <input
                required
                placeholder="12 / 28"
                value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                className="mt-1 w-full rounded-lg border border-card-border bg-background px-3 py-2.5"
              />
            </label>
            <label className="block text-sm font-medium">
              CVC
              <input
                required
                inputMode="numeric"
                placeholder="123"
                value={card.cvc}
                onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                className="mt-1 w-full rounded-lg border border-card-border bg-background px-3 py-2.5"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={paying}
            className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            {paying ? "Processing…" : `Subscribe — ${format(plan.priceGBP)}/month`}
          </button>
        </form>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Test mode: no card is charged and no payment details leave your
          browser. To take real payments, add your Stripe Payment Links in{" "}
          <code>src/lib/billing.ts</code>.
        </p>
      </div>
      <p className="mt-4 text-center text-sm">
        <Link href="/#pricing" className="text-primary underline">
          ← Back to plans
        </Link>
      </p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutInner />
    </Suspense>
  );
}
