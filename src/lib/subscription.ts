// Client-side subscription state. Mirrors the auth demo: the tier lives in
// localStorage until a real billing provider is wired in.

import { isAdmin } from "@/lib/auth";

export type Tier = "starter" | "premium" | "family";

const TIER_KEY = "mmp-tier";
export const TIER_CHANGED_EVENT = "mmp-tier-changed";

export function currentTier(): Tier {
  if (typeof window === "undefined") return "starter";
  if (isAdmin()) return "family";
  const raw = localStorage.getItem(TIER_KEY);
  return raw === "premium" || raw === "family" ? raw : "starter";
}

export function isPremium(): boolean {
  if (typeof window === "undefined") return false;
  if (isAdmin()) return true;
  return currentTier() !== "starter";
}

export function setTier(tier: Tier): void {
  localStorage.setItem(TIER_KEY, tier);
  window.dispatchEvent(new Event(TIER_CHANGED_EVENT));
}
