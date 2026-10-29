"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PAID_PLANS,
  PLANS,
  STRIPE_PORTAL_URL,
  cancelSubscription,
  useBillingState,
} from "@/lib/billing";
import { useCurrentUser } from "@/lib/auth";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function AccountPage() {
  const { format } = useCurrency();
  const user = useCurrentUser();
  const { sub, used } = useBillingState();
  const plan = PLANS[sub.plan];
  const limit = plan.monthlyPlanLimit;
  const remaining = limit === null ? null : Math.max(0, limit - used);
  const [confirmCancel, setConfirmCancel] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold">Account &amp; billing</h1>
      {user && (
        <p className="mt-1 text-sm text-muted">
          {user.name} · {user.email}
        </p>
      )}

      {/* Current plan */}
      <section className="hard mt-6 rounded-2xl bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">{plan.name} plan</h2>
            <p className="text-sm text-muted">
              {sub.plan === "starter"
                ? "Free forever"
                : `${format(plan.priceGBP)}/month · ${
                    sub.status === "active" ? "active" : "canceled"
                  }${
                    sub.renewsAt
                      ? ` · renews ${new Date(sub.renewsAt).toLocaleDateString()}`
                      : ""
                  }`}
            </p>
          </div>
          {sub.plan !== "starter" && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                sub.source === "stripe"
                  ? "border-2 border-card-border bg-accent-light text-foreground"
                  : "border-2 border-card-border bg-secondary text-foreground"
              }`}
            >
              {sub.source === "stripe" ? "PAID VIA STRIPE" : "TEST MODE"}
            </span>
          )}
        </div>

        {remaining !== null && (
          <div className="mt-5">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Meal plans this month</span>
              <span className="text-muted">
                {used} of {limit} used
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    (used / (limit ?? 1)) * 100
                  )}%`,
                }}
              />
            </div>
            {remaining === 0 && (
              <p className="mt-2 text-sm font-medium text-primary">
                Limit reached — upgrade for unlimited plans.
              </p>
            )}
          </div>
        )}

        {/* Upgrade CTAs */}
        {sub.plan === "starter" && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {PAID_PLANS.filter((p) => p !== sub.plan).map((p) => (
              <Link
                key={p}
                href={`/checkout?plan=${p}`}
                className="btn btn-primary flex-1"
              >
                Upgrade to {PLANS[p].name} — {format(PLANS[p].priceGBP)}/mo
              </Link>
            ))}
          </div>
        )}

        {/* Manage / cancel */}
        {sub.plan !== "starter" && (
          <div className="mt-6 border-t border-card-border pt-4">
            {STRIPE_PORTAL_URL ? (
              <a
                href={STRIPE_PORTAL_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary underline"
              >
                Manage payment method &amp; invoices in Stripe →
              </a>
            ) : confirmCancel ? (
              <div className="flex items-center gap-3 text-sm">
                <span>Cancel your subscription?</span>
                <button
                  onClick={() => {
                    cancelSubscription();
                    setConfirmCancel(false);
                  }}
                  className="rounded-lg bg-red-600 px-3 py-1.5 font-bold text-white"
                >
                  Yes, cancel
                </button>
                <button
                  onClick={() => setConfirmCancel(false)}
                  className="text-muted underline"
                >
                  Keep it
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmCancel(true)}
                className="text-sm text-muted underline"
              >
                Cancel subscription
              </button>
            )}
          </div>
        )}
      </section>

      <section className="hard-sm mt-6 rounded-2xl bg-card p-6 text-sm text-muted">
        <h2 className="font-bold text-foreground">Need a hand?</h2>
        <p className="mt-1">
          Questions about billing —{" "}
          <Link href="/contact" className="text-primary underline">
            contact us
          </Link>{" "}
          or read the{" "}
          <Link href="/faq" className="text-primary underline">
            FAQ
          </Link>
          . Refunds within 14 days of first payment.
        </p>
      </section>
    </div>
  );
}
