"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  detectCountry,
  fetchLiveRates,
  formatMoney,
  hasLiveRates,
  type CountryInfo,
} from "@/lib/currency";

interface CurrencyContextValue {
  country: CountryInfo;
  setCountry: (country: CountryInfo) => void;
  format: (amountGBP: number) => string;
  ratesLive: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  country: DEFAULT_COUNTRY,
  setCountry: () => {},
  format: (n) => `£${n.toFixed(2)}`,
  ratesLive: false,
});

const STORAGE_KEY = "mmp-country";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryInfo>(() => {
    if (typeof window === "undefined") return DEFAULT_COUNTRY;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const match = saved ? COUNTRIES.find((c) => c.code === saved) : null;
      return match ?? DEFAULT_COUNTRY;
    } catch {
      return DEFAULT_COUNTRY;
    }
  });
  const [ratesLive, setRatesLive] = useState(false);
  // bump to re-render after rates load
  const [, setRatesVersion] = useState(0);

  useEffect(() => {
    fetchLiveRates().then((ok) => {
      setRatesLive(ok && hasLiveRates());
      setRatesVersion((v) => v + 1);
    });
    detectCountry().then((detected) => {
      if (detected) setCountryState(detected);
    });
  }, []);

  const setCountry = useCallback((c: CountryInfo) => {
    setCountryState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c.code);
    } catch (err) {
      console.warn("[currency] Could not persist country:", err);
    }
  }, []);

  const format = useCallback(
    (amountGBP: number) => formatMoney(amountGBP, country),
    [country]
  );

  return (
    <CurrencyContext.Provider value={{ country, setCountry, format, ratesLive }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
