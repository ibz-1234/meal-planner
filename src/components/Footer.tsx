"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-card-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Mealsmith logo" width={28} height={28} className="h-7 w-7" />
              <span className="text-lg font-bold">
                Meal<span className="text-primary">smith</span>
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">{t("footer.tagline")}</p>
          </div>
          <div>
            <h3 className="font-semibold">Features</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              <li>Weekly Meal Plans</li>
              <li>Smart Shopping Lists</li>
              <li>Price Comparison</li>
              <li>Waste Reduction</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              <li>About</li>
              <li>Blog</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-card-border pt-4 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} Mealsmith. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
