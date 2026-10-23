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
          <Image src="/logo.svg" alt="Tiffinly logo" width={38} height={38} className="h-9 w-9" />
          <span className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            tiffin<span className="text-primary">ly</span>
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
              <Link
                href="/account"
                className="text-sm font-medium text-muted hover:text-foreground"
              >
                Account
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
            className="btn btn-primary !px-4 !py-2 !text-sm"
          >
            {t("nav.getStarted")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
