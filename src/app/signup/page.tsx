"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const result = signUp(name, email, password);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          window.dispatchEvent(new Event("mmp-auth-changed"));
          router.push("/");
        }}
        className="rounded-3xl border border-card-border bg-card p-6 shadow-sm sm:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Start saving
        </p>
        <h1 className="mt-3 text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-sm text-muted">
          Save your meal plans and come back later.
        </p>
        <label className="mt-6 block text-sm font-medium">Name</label>
        <input
          className="mt-2 w-full rounded-xl border border-card-border bg-background px-4 py-3 outline-none focus:border-primary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="mt-4 block text-sm font-medium">Email</label>
        <input
          className="mt-2 w-full rounded-xl border border-card-border bg-background px-4 py-3 outline-none focus:border-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <label className="mt-4 block text-sm font-medium">Password</label>
        <input
          className="mt-2 w-full rounded-xl border border-card-border bg-background px-4 py-3 outline-none focus:border-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        {error && <p className="mt-4 text-sm font-medium text-danger">{error}</p>}
        <button className="mt-6 w-full rounded-xl bg-primary px-4 py-3 font-bold text-white">
          Create account
        </button>
        <p className="mt-4 text-sm text-muted">
          Already have one?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
