"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CurrencySelector from "./CurrencySelector";
import LanguageSelector from "./LanguageSelector";
import { currentUser, logOut, type User } from "@/lib/auth";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const router = useRouter();
  const { t } = useLanguage();
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
          <Image src="/logo.png" alt="Mealsmith logo" width={36} height={36} className="h-9 w-9" />
          <span className="text-xl font-bold text-foreground">
            Meal<span className="text-primary">smith</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3">
          <LanguageSelector />
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
                {t("nav.myPlan")}
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
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              {t("nav.login")}
            </Link>
          )}
          <Link
            href="/preview"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {t("nav.getStarted")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
