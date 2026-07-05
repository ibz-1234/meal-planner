"use client";

import Link from "next/link";
import PreferencesForm from "@/components/PreferencesForm";

export default function PreviewPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-3xl border border-card-border bg-card p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Free preview
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Make a plan in a couple of minutes.
          </h1>
          <p className="mt-3 text-muted">
            Pick your budget and goals, then generate a weekly plan with meals,
            macros, shopping lists, and local store comparisons.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              "No signup needed",
              "Progress saved locally",
              "Cheapest shop highlighted",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-card-border bg-background px-4 py-3 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-card-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">Start your plan</h2>
          <p className="mt-2 text-sm text-muted">
            This preview feeds into the weekly plan and local shop comparison.
          </p>
          <div className="mt-6">
            <PreferencesForm />
          </div>
          <p className="mt-4 text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary">
              Log in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
