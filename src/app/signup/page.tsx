"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "@/lib/auth";
import { IconCheck } from "@/lib/icons";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const result = signUp(name, email, password);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          window.dispatchEvent(new Event("mmp-auth-changed"));
          const next = new URLSearchParams(window.location.search).get("next");
          router.push(next && next.startsWith("/") ? next : "/");
        }}
        className="hard order-2 rounded-3xl bg-card p-6 sm:p-9 lg:order-1"
      >
        <p className="kicker text-primary">Start saving</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-muted">
          Save your meal plans, shopping lists and progress.
        </p>
        <label className="mt-6 block text-sm font-semibold">Name</label>
        <input
          className="mt-2 w-full rounded-xl border border-card-border bg-background px-4 py-3 outline-none focus:border-primary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
        <label className="mt-4 block text-sm font-semibold">Email</label>
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
          autoComplete="new-password"
          required
        />
        {error && <p className="mt-4 text-sm font-medium text-danger">{error}</p>}
        <button className="btn btn-primary mt-6 w-full">Create account</button>
        <p className="mt-4 text-sm text-muted">
          Already have one?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Log in
          </Link>
        </p>
      </form>

      <div className="relative order-1 overflow-hidden rounded-3xl lg:order-2">
        <Image
          src="/meal-salmon-traybake.webp"
          alt="Salmon traybake — a CookDeck midweek meal"
          width={800}
          height={800}
          priority
          className="h-64 w-full rounded-3xl border-2 border-card-border object-cover lg:h-full lg:min-h-[560px]"
        />
        <div className="absolute inset-0 flex flex-col justify-end rounded-3xl bg-gradient-to-t from-black/55 via-black/10 to-transparent p-6 sm:p-8">
          <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            Free to start. No card needed.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm font-medium text-white/90">
            <li className="flex items-center gap-2">
              <IconCheck className="h-4 w-4 text-accent-light" /> 3 meal plans a
              month, free
            </li>
            <li className="flex items-center gap-2">
              <IconCheck className="h-4 w-4 text-accent-light" /> Cheapest-shop
              comparison
            </li>
            <li className="flex items-center gap-2">
              <IconCheck className="h-4 w-4 text-accent-light" /> Upgrade any
              time
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
