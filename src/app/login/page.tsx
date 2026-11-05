"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logIn } from "@/lib/auth";
import { IconCheck } from "@/lib/icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center">
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src="/meal-katsu.webp"
          alt="Chicken Katsu Curry — a CookDeck weeknight meal"
          width={800}
          height={800}
          priority
          className="h-64 w-full rounded-3xl border-2 border-card-border object-cover lg:h-full lg:min-h-[560px]"
        />
        <div className="absolute inset-0 flex flex-col justify-end rounded-3xl bg-gradient-to-t from-black/55 via-black/10 to-transparent p-6 sm:p-8">
          <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            Your week of meals, sorted.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm font-medium text-white/90">
            <li className="flex items-center gap-2">
              <IconCheck className="h-4 w-4 text-accent-light" /> A full week of
              dinners in 30 seconds
            </li>
            <li className="flex items-center gap-2">
              <IconCheck className="h-4 w-4 text-accent-light" /> Shopping list
              grouped by aisle
            </li>
            <li className="flex items-center gap-2">
              <IconCheck className="h-4 w-4 text-accent-light" /> Priced at your
              local supermarkets
            </li>
          </ul>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const result = logIn(email, password);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          window.dispatchEvent(new Event("mmp-auth-changed"));
          const next = new URLSearchParams(window.location.search).get("next");
          router.push(next && next.startsWith("/") ? next : "/");
        }}
        className="hard rounded-3xl bg-card p-6 sm:p-9"
      >
        <p className="kicker text-primary">Welcome back</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          Log in
        </h1>
        <p className="mt-2 text-sm text-muted">
          Access your saved meal plan, shopping list and progress.
        </p>
        <label className="mt-6 block text-sm font-semibold">Email</label>
        <input
          className="mt-2 w-full rounded-xl border border-card-border bg-background px-4 py-3 outline-none focus:border-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
        />
        <label className="mt-4 block text-sm font-semibold">Password</label>
        <input
          className="mt-2 w-full rounded-xl border border-card-border bg-background px-4 py-3 outline-none focus:border-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          required
        />
        {error && <p className="mt-4 text-sm font-medium text-danger">{error}</p>}
        <button className="btn btn-primary mt-6 w-full">Log in</button>
        <p className="mt-4 text-sm text-muted">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-primary">
            Create a free account
          </Link>
        </p>
        <p className="mt-2 text-xs text-muted">
          Just browsing?{" "}
          <Link
            href="/sample"
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            See a sample week
          </Link>
        </p>
      </form>
    </div>
  );
}
