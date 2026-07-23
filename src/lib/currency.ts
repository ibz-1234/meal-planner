// Currency system — base prices are stored in GBP and converted for display.
// Live rates come from open.er-api.com with hardcoded fallbacks (mid-2026 rates,
// benchmarked when prices were sourced from PriceRunner UK listings).

export interface CountryInfo {
  code: string; // ISO country code
  name: string;
  flag: string;
  currency: string; // ISO currency code
  locale: string;
}

export const COUNTRIES: CountryInfo[] = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", locale: "en-GB" },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", locale: "en-US" },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR", locale: "de-DE" },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR", locale: "fr-FR" },
  { code: "ES", name: "Spain", flag: "🇪🇸", currency: "EUR", locale: "es-ES" },
  { code: "IT", name: "Italy", flag: "🇮🇹", currency: "EUR", locale: "it-IT" },
  { code: "IE", name: "Ireland", flag: "🇮🇪", currency: "EUR", locale: "en-IE" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", currency: "EUR", locale: "nl-NL" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", locale: "en-AU" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", locale: "en-CA" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", currency: "NZD", locale: "en-NZ" },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY", locale: "ja-JP" },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", locale: "en-IN" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", currency: "PKR", locale: "en-PK" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", currency: "AED", locale: "en-AE" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR", locale: "en-SA" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", currency: "SGD", locale: "en-SG" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", currency: "ZAR", locale: "en-ZA" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", currency: "BRL", locale: "pt-BR" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", currency: "MXN", locale: "es-MX" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", currency: "SEK", locale: "sv-SE" },
  { code: "NO", name: "Norway", flag: "🇳🇴", currency: "NOK", locale: "nb-NO" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", currency: "DKK", locale: "da-DK" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", currency: "CHF", locale: "de-CH" },
  { code: "PL", name: "Poland", flag: "🇵🇱", currency: "PLN", locale: "pl-PL" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", currency: "TRY", locale: "tr-TR" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", currency: "KRW", locale: "ko-KR" },
  { code: "CN", name: "China", flag: "🇨🇳", currency: "CNY", locale: "zh-CN" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "NGN", locale: "en-NG" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", currency: "EGP", locale: "ar-EG" },
];

// Fallback exchange rates: 1 GBP = X units (mid-2026)
export const FALLBACK_RATES: Record<string, number> = {
  GBP: 1,
  USD: 1.27,
  EUR: 1.17,
  AUD: 1.93,
  CAD: 1.74,
  NZD: 2.09,
  JPY: 191,
  INR: 106,
  PKR: 355,
  AED: 4.66,
  SAR: 4.76,
  SGD: 1.7,
  ZAR: 23.1,
  BRL: 6.9,
  MXN: 23.4,
  SEK: 13.3,
  NOK: 13.6,
  DKK: 8.73,
  CHF: 1.12,
  PLN: 5.0,
  TRY: 43.5,
  KRW: 1740,
  CNY: 9.1,
  NGN: 1980,
  EGP: 62,
};

let liveRates: Record<string, number> | null = null;
let ratesAreLive = false;

export async function fetchLiveRates(): Promise<boolean> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/GBP");
    if (!res.ok) throw new Error(`Rate API returned ${res.status}`);
    const data = await res.json();
    if (data && data.result === "success" && data.rates) {
      liveRates = data.rates as Record<string, number>;
      ratesAreLive = true;
      return true;
    }
    throw new Error("Unexpected rate API response shape");
  } catch (err) {
    console.warn("[currency] Live rates unavailable, using fallback:", err);
    ratesAreLive = false;
    return false;
  }
}

export function hasLiveRates(): boolean {
  return ratesAreLive;
}

export function getRate(currency: string): number {
  if (liveRates && liveRates[currency]) return liveRates[currency];
  return FALLBACK_RATES[currency] ?? 1;
}

/** Convert a GBP base amount into the target currency. */
export function convertFromGBP(amountGBP: number, currency: string): number {
  return amountGBP * getRate(currency);
}

/** Convert an amount in the given currency back to the GBP base. */
export function convertToGBP(amount: number, currency: string): number {
  return amount / getRate(currency);
}

/** The currency symbol for a country, e.g. "£" for GB. */
export function currencySymbol(country: CountryInfo): string {
  try {
    const parts = new Intl.NumberFormat(country.locale, {
      style: "currency",
      currency: country.currency,
    }).formatToParts(0);
    return parts.find((p) => p.type === "currency")?.value ?? country.currency;
  } catch {
    return country.currency;
  }
}

export function formatMoney(
  amountGBP: number,
  country: CountryInfo
): string {
  const converted = convertFromGBP(amountGBP, country.currency);
  try {
    return new Intl.NumberFormat(country.locale, {
      style: "currency",
      currency: country.currency,
      maximumFractionDigits: ["JPY", "KRW"].includes(country.currency) ? 0 : 2,
    }).format(converted);
  } catch (err) {
    console.warn("[currency] Intl formatting failed:", err);
    return `${country.currency} ${converted.toFixed(2)}`;
  }
}

export async function detectCountry(): Promise<CountryInfo | null> {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error(`Geo API returned ${res.status}`);
    const data = await res.json();
    const match = COUNTRIES.find((c) => c.code === data.country_code);
    return match ?? null;
  } catch (err) {
    console.warn("[currency] Country auto-detection failed:", err);
    return null;
  }
}

export const DEFAULT_COUNTRY = COUNTRIES[0]; // UK
