"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-card pb-24 md:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
            Chef<span className="text-primary">.ai</span>
          </Link>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted">
            Weekly meal plans, shopping lists and supermarket prices for real kitchens.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted">
          <Link href="/preview" className="hover:text-foreground">Recipes</Link>
          <Link href="/plan" className="hover:text-foreground">My plan</Link>
          <Link href="/upgrade" className="hover:text-foreground">Pricing</Link>
          <Link href="/faq" className="hover:text-foreground">FAQ</Link>
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
        </nav>
      </div>
      <div className="border-t border-card-border py-6 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} Chef.ai. All rights reserved.
      </div>
    </footer>
  );
}
