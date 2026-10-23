// Subscription billing for Tiffinly.
//
// Charges run through Stripe Payment Links — Stripe hosts the checkout and
// handles the card, the recurring subscription, and the customer portal, so
// the static site needs no server. Paste your live Payment Link URLs into
// STRIPE_PAYMENT_LINKS below (or set the NEXT_PUBLIC_* env vars at build time)
// and set each link's confirmation page to:
//   https://tiffinly.surge.sh/checkout/success?plan=<plan>&source=stripe
//
// Until a link is configured, checkout runs in test mode: the card form is
// simulated, nothing is charged, and the subscription is marked source "test".

export type PlanId = "starter" | "premium";

export interface PlanMeta {
  id: PlanId;
  name: string;
  priceGBP: number;
  monthlyPlanLimit: number | null; // null = unlimited
}

export const PLANS: Record<PlanId, PlanMeta> = {
  starter: { id: "starter", name: "Starter", priceGBP: 0, monthlyPlanLimit: 3 },
  premium: { id: "premium", name: "Premium", priceGBP: 5.99, monthlyPlanLimit: null },
};

export const PAID_PLANS: PlanId[] = ["premium"];

// ── Stripe configuration ────────────────────────────────────────────────────
// Fill these in (or set env vars) to take real payments.
export const STRIPE_PAYMENT_LINKS: Partial<Record<PlanId, string>> = {
  premium: process.env.NEXT_PUBLIC_STRIPE_LINK_PREMIUM || "",
};

// Stripe customer portal URL (Billing → Portal → "Link to your portal").
export const STRIPE_PORTAL_URL = process.env.NEXT_PUBLIC_STRIPE_PORTAL || "";

export function stripeConfigured(plan: PlanId): boolean {
  return Boolean(STRIPE_PAYMENT_LINKS[plan]);
}

export function checkoutUrlFor(
  plan: PlanId,
  email?: string | null
): string | null {
  const base = STRIPE_PAYMENT_LINKS[plan];
  if (!base) return null;
  return email ? `${base}?prefilled_email=${encodeURIComponent(email)}` : base;
}

// ── Entitlement ─────────────────────────────────────────────────────────────

export interface Subscription {
  plan: PlanId;
  status: "active" | "canceled";
  source: "stripe" | "test";
  startedAt: string; // ISO date
  renewsAt: string; // ISO date
}

const SUB_KEY = "mmp-subscription";
const USAGE_KEY = "mmp-plan-usage";

function readSub(): Subscription | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SUB_KEY);
    return raw ? (JSON.parse(raw) as Subscription) : null;
  } catch {
    return null;
  }
}

export function currentSubscription(): Subscription {
  return readSub() ?? {
    plan: "starter",
    status: "active",
    source: "test",
    startedAt: "",
    renewsAt: "",
  };
}

export function isPaid(): boolean {
  const sub = readSub();
  return Boolean(sub && sub.status === "active" && sub.plan !== "starter");
}

export function activatePlan(plan: PlanId, source: "stripe" | "test"): Subscription {
  const renewsAt = new Date();
  renewsAt.setMonth(renewsAt.getMonth() + 1);
  const sub: Subscription = {
    plan,
    status: "active",
    source,
    startedAt: new Date().toISOString(),
    renewsAt: renewsAt.toISOString(),
  };
  localStorage.setItem(SUB_KEY, JSON.stringify(sub));
  window.dispatchEvent(new Event("mmp-auth-changed"));
  return sub;
}

export function cancelSubscription(): void {
  localStorage.removeItem(SUB_KEY);
  window.dispatchEvent(new Event("mmp-auth-changed"));
}

export function isValidPlan(value: string | null): value is PlanId {
  return value === "starter" || value === "premium";
}

// ── React hook: hydration-safe reactive billing state ───────────────────────

import { useSyncExternalStore } from "react";

function subscribeBilling(onChange: () => void): () => void {
  window.addEventListener("mmp-auth-changed", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("mmp-auth-changed", onChange);
    window.removeEventListener("storage", onChange);
  };
}

const DEFAULT_SUB: Subscription = {
  plan: "starter",
  status: "active",
  source: "test",
  startedAt: "",
  renewsAt: "",
};

function billingSnapshot(): string {
  return JSON.stringify({ sub: readSub(), used: readUsage().count });
}

export function useBillingState(): { sub: Subscription; used: number } {
  const raw = useSyncExternalStore(
    subscribeBilling,
    billingSnapshot,
    () => JSON.stringify({ sub: null, used: 0 })
  );
  try {
    const parsed = JSON.parse(raw) as { sub: Subscription | null; used: number };
    return { sub: parsed.sub ?? DEFAULT_SUB, used: parsed.used };
  } catch {
    return { sub: DEFAULT_SUB, used: 0 };
  }
}

// ── Usage tracking (free tier limit) ────────────────────────────────────────

interface UsageRecord {
  month: string; // "2026-10"
  count: number;
}

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

function readUsage(): UsageRecord {
  if (typeof window === "undefined") return { month: currentMonth(), count: 0 };
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    const rec = raw ? (JSON.parse(raw) as UsageRecord) : null;
    if (rec && rec.month === currentMonth()) return rec;
  } catch {
    // fall through
  }
  return { month: currentMonth(), count: 0 };
}

export function plansUsedThisMonth(): number {
  return readUsage().count;
}

export function plansRemaining(): number | null {
  const limit = PLANS[currentSubscription().plan].monthlyPlanLimit;
  if (limit === null) return null;
  return Math.max(0, limit - readUsage().count);
}

// Returns true when the generation is allowed (and records it). Paid plans are
// always allowed and not counted.
export function recordPlanGeneration(): boolean {
  if (isPaid()) return true;
  const limit = PLANS.starter.monthlyPlanLimit ?? 0;
  const usage = readUsage();
  if (usage.count >= limit) return false;
  usage.count += 1;
  localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
  return true;
}
