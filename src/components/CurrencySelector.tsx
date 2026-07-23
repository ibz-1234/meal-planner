"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTRIES } from "@/lib/currency";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function CurrencySelector() {
  const { country, setCountry, ratesLive } = useCurrency();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.currency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title={`Currency: ${country.currency}${ratesLive ? " (live rates)" : " (offline rates)"}`}
        className="flex items-center gap-1.5 rounded-full border border-card-border bg-card px-3 py-1.5 text-sm font-medium hover:border-primary/40"
      >
        <span>{country.flag}</span>
        <span>{country.currency}</span>
        <span
          className={`h-1.5 w-1.5 rounded-full ${ratesLive ? "bg-green-500" : "bg-amber-400"}`}
        />
        <svg className="h-3 w-3 opacity-60" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-card-border bg-card p-2 shadow-lg">
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search country or currency…"
            className="mb-2 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <div className="max-h-64 overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCountry(c);
                  setOpen(false);
                  setSearch("");
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-primary-light/40 ${
                  c.code === country.code ? "bg-primary-light/30 font-semibold" : ""
                }`}
              >
                <span>{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-xs text-muted">{c.currency}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-2 text-sm text-muted">No matches</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
