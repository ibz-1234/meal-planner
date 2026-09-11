"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-card-border bg-card pb-24 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
              Chef<span className="text-primary">.ai</span>
            </Link>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><Link href="/preview" className="hover:text-primary">Build my week</Link></li>
              <li><Link href="/plan" className="hover:text-primary">My plan</Link></li>
              <li><Link href="/upgrade" className="hover:text-primary">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-card-border pt-6 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} Chef.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
