"use client";

import Link from "next/link";
import { useState } from "react";
import { currentUser, listUsers, usersCreatedToday, type User } from "@/lib/auth";
import { currentTier } from "@/lib/subscription";

export default function AdminPage() {
  const [user] = useState<User | null>(() => currentUser());

  if (!user || user.role !== "admin") {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Restricted</p>
        <h1 className="mt-3 font-serif text-3xl font-bold">Admins only</h1>
        <p className="mt-2 text-sm text-muted">
          Log in with an admin account to see this page.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Log in
        </Link>
      </div>
    );
  }

  const users = listUsers();
  const today = usersCreatedToday();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Admin</p>
      <h1 className="mt-3 font-serif text-3xl font-bold">Kitchen control</h1>
      <p className="mt-2 text-sm text-muted">
        Signed in as {user.name} ({user.email}) · tier: {currentTier()}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-card-border bg-card p-5">
          <p className="text-sm text-muted">Accounts on this device</p>
          <p className="mt-1 font-serif text-3xl font-bold">{users.length}</p>
        </div>
        <div className="rounded-xl border border-card-border bg-card p-5">
          <p className="text-sm text-muted">Created today</p>
          <p className="mt-1 font-serif text-3xl font-bold">{today}</p>
        </div>
        <div className="rounded-xl border border-card-border bg-card p-5">
          <p className="text-sm text-muted">Your access</p>
          <p className="mt-1 font-serif text-3xl font-bold text-secondary">Full</p>
        </div>
      </div>

      <h2 className="mt-10 font-serif text-xl font-bold">Accounts</h2>
      <p className="mt-1 text-xs text-muted">
        Chef.ai stores accounts in the browser until a real backend is wired in, so this list only shows
        accounts created on this device.
      </p>
      <ul className="mt-4 divide-y divide-card-border rounded-xl border border-card-border bg-card">
        {users.length === 0 && (
          <li className="px-5 py-4 text-sm text-muted">No accounts yet.</li>
        )}
        {users.map((u) => (
          <li key={u.email} className="flex items-center justify-between px-5 py-3 text-sm">
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-muted">{u.email}</p>
            </div>
            <div className="text-right text-xs text-muted">
              <p>{new Date(u.createdAt).toLocaleDateString("en-GB")}</p>
              {u.role === "admin" && (
                <p className="font-semibold text-secondary">admin</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
