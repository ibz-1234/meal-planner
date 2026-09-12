"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
    <header className="sticky top-0 z-40 border-b border-card-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Chef.ai logo" width={32} height={32} className="h-8 w-8 rounded-lg" />
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            Chef<span className="text-primary">.ai</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/preview" className="text-sm font-medium text-muted hover:text-foreground">Recipes</Link>
          <Link href="/#how" className="text-sm font-medium text-muted hover:text-foreground">How it works</Link>
          <Link href="/#pricing" className="text-sm font-medium text-muted hover:text-foreground">Pricing</Link>
          {user ? (
            <>
              <Link href="/plan" className="text-sm font-medium text-muted hover:text-foreground">{t("nav.myPlan")}</Link>
              {user.role === "admin" && (
                <Link href="/admin" className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-white">
                  Admin
                </Link>
              )}
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
            <Link href="/login" className="text-sm font-medium text-muted hover:text-foreground">{t("nav.login")}</Link>
          )}
        </nav>

        <Link
          href="/preview"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
        >
          {t("nav.getStarted")}
        </Link>
      </div>
    </header>
  );
}
