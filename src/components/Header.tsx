"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CurrencySelector from "./CurrencySelector";
import { currentUser, logOut, type User } from "@/lib/auth";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(() => currentUser());

  useEffect(() => {
    const onStorage = () => setUser(currentUser());
    window.addEventListener("storage", onStorage);
    window.addEventListener("mmp-auth-changed", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("mmp-auth-changed", onStorage);
    };
  }, []);

  return (
    <header className="border-b border-card-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="text-xl font-bold text-foreground">
            My Meal <span className="text-primary">Plan</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3">
          <CurrencySelector />
          {user ? (
            <>
              <span className="hidden text-sm font-medium sm:inline">
                Hi, {user.name.split(" ")[0]}
              </span>
              <Link
                href="/plan"
                className="hidden text-sm font-medium text-muted hover:text-foreground sm:inline"
              >
                My plan
              </Link>
              <button
                type="button"
                onClick={() => {
                  logOut();
                  setUser(null);
                  window.dispatchEvent(new Event("mmp-auth-changed"));
                  router.push("/");
                }}
                className="text-sm font-medium text-muted hover:text-foreground"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              Log in
            </Link>
          )}
          <Link
            href="/preview"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
