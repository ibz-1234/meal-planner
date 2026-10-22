"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PAID_PLANS,
  PLANS,
  STRIPE_PORTAL_URL,
  cancelSubscription,
  currentSubscription,
  plansRemaining,
  plansUsedThisMonth,
} from "@/lib/billing";
import { currentUser, type User } from "@/lib/auth";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function AccountPage() {
  const { format } = useCurrency();
  const [user, setUser] = useState<User | null>(null);
  const [sub, setSub] = useState(currentSubscription);
  const plan = PLANS[sub.plan];
  const remaining = plansRemaining();
  const used = plansUsedThisMonth();
  const [confirmCancel, setConfirmCancel] = useState(false);

  useEffect(() => {
    setUser(currentUser());
    setSub(currentSubscription());
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold">Account &amp; billing</h1>
      {user && (
        <p className="mt-1 text-sm text-muted">
          {user.name} · {user.email}
        </p>
      )}

      {/* Current plan */}
      <section className="mt-6 rounded-2xl border border-card-border bg-card p-6">
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
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
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
                {used} of {plan.monthlyPlanLimit} used
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    (used / (plan.monthlyPlanLimit ?? 1)) * 100
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
        {sub.plan !== "family" && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {PAID_PLANS.filter((p) => p !== sub.plan).map((p) => (
              <Link
                key={p}
                href={`/checkout?plan=${p}`}
                className="flex-1 rounded-xl bg-primary py-3 text-center text-sm font-bold text-white hover:bg-primary-dark"
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
                    setSub(currentSubscription());
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

      <section className="mt-6 rounded-2xl border border-card-border bg-card p-6 text-sm text-muted">
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
