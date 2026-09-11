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
    <header className="sticky top-0 z-40 border-b border-card-border/60 bg-card/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Chef.ai logo" width={34} height={34} className="h-8 w-8 rounded-full" />
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            Chef<span className="text-primary">.ai</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex sm:items-center sm:gap-2">
            <LanguageSelector />
            <CurrencySelector />
          </div>
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
              className="text-sm font-medium text-muted hover:text-foreground hidden sm:inline"
            >
              {t("nav.login")}
            </Link>
          )}
          <Link
            href="/preview"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark hover:shadow-md"
          >
            {t("nav.getStarted")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
