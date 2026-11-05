// Hand-drawn-style brand icons. Ink outlines, rounded caps, slightly
// imperfect geometry — drawn for Tiffinly, not an emoji set.

type P = { className?: string };

function base(className?: string) {
  return `h-5 w-5 ${className ?? ""}`;
}

export function IconCheck({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path d="M4 12.6l5.2 5.4L20 6.4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCross({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconStar({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={base(className)} aria-hidden>
      <path
        d="M12 3.4l2.6 5.4 5.9.8-4.3 4.1 1.1 5.8L12 16.7l-5.3 2.8 1.1-5.8-4.3-4.1 5.9-.8z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconClipboard({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <rect x="5" y="4.5" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M9 4.5a3 3 0 016 0" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M8.5 10.5h7M8.5 14h7M8.5 17.5h4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function IconTag({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path
        d="M12.6 3.5h6.9v6.9l-9.3 9.3a2.2 2.2 0 01-3.1 0l-3.8-3.8a2.2 2.2 0 010-3.1z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="7" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function IconBasket({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path d="M4.5 9h15l-1.6 9.6a2.5 2.5 0 01-2.5 2.1H8.6a2.5 2.5 0 01-2.5-2.1z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M8.5 9l3.2-5M15.5 9l-3.2-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M9 12.5v4M12 12.5v4M15 12.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconShop({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path d="M4.5 8.5L6 4h12l1.5 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M4.5 8.5a2.4 2.4 0 004.8 0 2.4 2.4 0 004.8 0 2.4 2.4 0 004.8 0" stroke="currentColor" strokeWidth="1.9" />
      <path d="M6 11.5V20h12v-8.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLeaf({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path
        d="M5 19C5 11 10.5 5.5 19.5 5c.6 8.5-4.6 14.5-13 14.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M6.5 18.5C9 14 12.5 10.5 17 8.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function IconChef({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path
        d="M8 11a3.4 3.4 0 01-1.4-6.5A4 4 0 0112 3a4 4 0 015.4 1.5A3.4 3.4 0 0116 11"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M8 11v6.5h8V11M8 15h8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function IconUsers({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M4 19.5c.6-3.3 2.6-5 5-5s4.4 1.7 5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M15.5 5.4a3.2 3.2 0 010 5.7M17.5 14.8c1.4.7 2.3 2.1 2.7 4.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function IconAlert({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path
        d="M12 4L2.8 19.5h18.4z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M12 10v4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="12" cy="16.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function IconPin({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path
        d="M12 21s6.6-6.3 6.6-11a6.6 6.6 0 10-13.2 0c0 4.7 6.6 11 6.6 11z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.8" r="2.4" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

export function IconCart({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path d="M3.5 4.5h2.4l2.1 10.5h10.4l2-7.5H7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="19" r="1.5" fill="currentColor" />
      <circle cx="16.5" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function IconUtensils({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path d="M6.5 3.5v7.5M4 3.5v4a2.5 2.5 0 005 0v-4M6.5 11v9.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M17 3.5c-1.9 1-2.8 3-2.8 5.2 0 1.9 1.1 3.3 2.8 3.3v8.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function IconNote({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path d="M6 3.5h12a1 1 0 011 1v15a1 1 0 01-1 1H6a1 1 0 01-1-1v-15a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function IconSwap({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path d="M4 8h13l-3.2-3.2M20 16H7l3.2 3.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGlobe({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M3.8 12h16.4M12 3.8c-5.2 5.8-5.2 10.6 0 16.4 5.2-5.8 5.2-10.6 0-16.4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconDumbbell({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path d="M7.5 8.5v7M4.5 10v4M16.5 8.5v7M19.5 10v4M7.5 12h9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function IconCarrot({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path
        d="M15.8 9.2L6 18.5c-1 1-1 2.2-.2 2.8.8.6 1.9.2 2.7-.7l9.6-9.5z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M16 9c1-2 0-4-1.5-5M16 9c2-1 4 0 5 1.5M15.5 12l1.5 1.5M12 15.5l1.5 1.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function IconClock({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M12 7.5V12l3.4 2.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPlate({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}
