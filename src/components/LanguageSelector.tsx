"use client";

import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
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

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title={`Language: ${current.name}`}
        className="flex items-center gap-1.5 rounded-full border border-card-border bg-card px-3 py-1.5 text-sm font-medium hover:border-primary/40"
      >
        <span>{current.flag}</span>
        <span className="uppercase">{current.code}</span>
        <svg className="h-3 w-3 opacity-60" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-card-border bg-card p-2 shadow-lg">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLanguage(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-primary-light/40 ${
                l.code === language ? "bg-primary-light/30 font-semibold" : ""
              }`}
            >
              <span>{l.flag}</span>
              <span className="flex-1">{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
