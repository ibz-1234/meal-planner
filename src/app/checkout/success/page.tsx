"use client";

import { Suspense, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { activatePlan, isValidPlan, PLANS, type PlanId } from "@/lib/billing";

function SuccessInner() {
  const params = useSearchParams();
  const plan: PlanId = isValidPlan(params.get("plan"))
    ? (params.get("plan") as PlanId)
    : "premium";
  const source = params.get("source") === "stripe" ? "stripe" : "test";
  const activated = useRef(false);

  useEffect(() => {
    if (!activated.current) {
      activated.current = true;
      activatePlan(plan, source);
    }
  }, [plan, source]);

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className="hard-sm mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
        <Image src="/logo.svg" alt="Tiffinly" width={40} height={40} />
      </div>
      <h1 className="mt-6 text-2xl font-bold">
        Welcome to Tiffinly {PLANS[plan].name}
      </h1>
      <p className="mt-3 text-muted">
        Your subscription is active — unlimited meal plans, smart shopping
        lists, and every Premium feature are unlocked.
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Link href="/" className="btn btn-primary">
          Generate a meal plan
        </Link>
        <Link href="/account" className="btn btn-ghost">
          View my subscription
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessInner />
    </Suspense>
  );
}
