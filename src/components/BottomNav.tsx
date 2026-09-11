"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const TABS = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Plan", href: "/plan", icon: CalendarIcon },
  { name: "Shop", href: "/plan?tab=shopping", icon: CartIcon },
  { name: "Recipes", href: "/#recipes", icon: BookIcon },
  { name: "Me", href: "/login", icon: UserIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  const search = useSearchParams();
  const tab = search.get("tab");

  function isActive(href: string) {
    if (href.startsWith("/#")) return pathname === "/";
    if (href === "/plan?tab=shopping") return pathname === "/plan" && tab === "shopping";
    return pathname === href.split("?")[0];
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-card-border/60 bg-card/90 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.04)] md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition ${
                active ? "text-primary" : "text-muted"
              }`}
            >
              {active && (
                <span className="absolute top-1 h-1 w-1 rounded-full bg-primary" />
              )}
              <Icon className={`h-5 w-5 ${active ? "fill-current" : ""}`} />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
