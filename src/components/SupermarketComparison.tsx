"use client";

import { useState } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { compareStores, getStoresForCountry } from "@/lib/stores";
import {
  compareUKBasket,
  UK_PRICE_TABLE_UPDATED,
  UK_STORES,
  type BasketItem,
  type UKStore,
} from "@/lib/grocery-prices";

const PREFERRED_STORE_KEY = "mmp-preferred-store";

function loadPreferredStore(): UKStore | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(PREFERRED_STORE_KEY);
    return UK_STORES.includes(saved as UKStore) ? (saved as UKStore) : null;
  } catch {
    return null;
  }
}

export default function SupermarketComparison({
  weeklyBasketGBP,
  items = [],
}: {
  weeklyBasketGBP: number;
  items?: BasketItem[];
}) {
  const { country, format } = useCurrency();
  const [preferredStore, setPreferredStoreState] = useState<UKStore | null>(
    () => loadPreferredStore()
  );

  const setPreferredStore = (store: UKStore) => {
    setPreferredStoreState(store);
    try {
      localStorage.setItem(PREFERRED_STORE_KEY, store);
    } catch (err) {
      console.warn("[stores] Could not persist preferred store:", err);
    }
  };

  const isUK = country.code === "GB" && items.length > 0;

  if (isUK) {
    const comparison = compareUKBasket(items);
    const cheapest = comparison[0];
    const storeMeta = new Map(
      getStoresForCountry("GB").map((s) => [s.name, s])
    );
    const preferred = preferredStore
      ? comparison.find((c) => c.store === preferredStore)
      : null;
    const switchSaving =
      preferred && !preferred.isCheapest
        ? Math.round((preferred.costGBP - cheapest.costGBP) * 100) / 100
        : 0;

    return (
      <div className="rounded-2xl border border-card-border bg-card p-6">
        <h3 className="text-lg font-bold">
          Your basket at UK supermarkets
        </h3>
        <p className="mb-4 text-sm text-muted">
          Every ingredient in your shopping list is priced per store, so totals
          reflect real shelf prices rather than a flat estimate.
        </p>

        <div className="mb-5">
          <p className="mb-2 text-sm font-semibold">Where do you usually shop?</p>
          <div className="flex flex-wrap gap-2">
            {UK_STORES.map((store) => (
              <button
                key={store}
                type="button"
                onClick={() => setPreferredStore(store)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  preferredStore === store
                    ? "border-primary bg-primary text-white"
                    : "border-card-border hover:border-primary hover:text-primary"
                }`}
              >
                {store}
              </button>
            ))}
          </div>
          {preferred && switchSaving > 0 && (
            <p className="mt-3 rounded-xl bg-primary-light/40 px-4 py-3 text-sm">
              Switching this basket from <strong>{preferred.store}</strong> to{" "}
              <strong>{cheapest.store}</strong> saves{" "}
              <strong className="text-primary">{format(switchSaving)}</strong>{" "}
              this week.
            </p>
          )}
          {preferred && preferred.isCheapest && (
            <p className="mt-3 rounded-xl bg-primary-light/40 px-4 py-3 text-sm">
              <strong>{preferred.store}</strong> is already the cheapest shop
              for this basket — nice.
            </p>
          )}
        </div>

        <div className="space-y-3">
          {comparison.map((row) => {
            const meta = storeMeta.get(row.store);
            return (
              <div
                key={row.store}
                className={`rounded-xl border p-4 transition-all ${
                  row.isCheapest
                    ? "border-primary bg-primary-light/30"
                    : "border-card-border"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{row.store}</span>
                      {row.isCheapest && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                          Cheapest
                        </span>
                      )}
                      {preferredStore === row.store && (
                        <span className="rounded-full border border-primary px-2 py-0.5 text-xs font-bold text-primary">
                          Your shop
                        </span>
                      )}
                    </div>
                    {meta && <p className="text-xs text-muted">{meta.note}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{format(row.costGBP)}</p>
                    {row.savingVsDearestGBP > 0 && (
                      <p className="text-xs font-medium text-primary">
                        saves {format(row.savingVsDearestGBP)} vs dearest
                      </p>
                    )}
                  </div>
                </div>
                {meta && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={meta.locatorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-card-border px-3 py-1 text-xs font-medium hover:border-primary hover:text-primary"
                    >
                      📍 Find your closest branch
                    </a>
                    <a
                      href={meta.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-card-border px-3 py-1 text-xs font-medium hover:border-primary hover:text-primary"
                    >
                      🛒 Shop online
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          Ingredient prices benchmarked against PriceRunner and each chain&apos;s
          online shop. Last updated {UK_PRICE_TABLE_UPDATED}.
        </p>
      </div>
    );
  }

  const stores = compareStores(weeklyBasketGBP, country.code);
  const cheapest = stores[0];
  const priciest = stores[stores.length - 1];
  const maxSaving = priciest.basketCostGBP - cheapest.basketCostGBP;

  return (
    <div className="rounded-2xl border border-card-border bg-card p-6">
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold">
          Shops in {country.flag} {country.name}
        </h3>
      </div>
      <p className="mb-4 text-sm text-muted">
        Your weekly basket priced at supermarkets available in {country.name}.
        Shop at <strong>{cheapest.name}</strong> and save up to{" "}
        <strong className="text-primary">{format(maxSaving)}</strong> compared
        with the most expensive option.
      </p>

      <div className="space-y-3">
        {stores.map((store) => (
          <div
            key={store.name}
            className={`rounded-xl border p-4 transition-all ${
              store.isCheapest
                ? "border-primary bg-primary-light/30"
                : "border-card-border"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{store.logo}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{store.name}</span>
                    {store.isCheapest && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                        Cheapest — best savings
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted">{store.note}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{format(store.basketCostGBP)}</p>
                {store.savingsVsAvgGBP > 0 ? (
                  <p className="text-xs font-medium text-primary">
                    saves {format(store.savingsVsAvgGBP)} vs average
                  </p>
                ) : (
                  <p className="text-xs text-muted">
                    {format(Math.abs(store.savingsVsAvgGBP))} above average
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={store.locatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-card-border px-3 py-1 text-xs font-medium hover:border-primary hover:text-primary"
              >
                📍 Find your closest branch
              </a>
              {store.website !== "#" && (
                <a
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-card-border px-3 py-1 text-xs font-medium hover:border-primary hover:text-primary"
                >
                  🛒 Shop online
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Basket estimates use each chain&apos;s national price index, benchmarked
        against PriceRunner listings. Change country in the header to see local
        shops.
      </p>
    </div>
  );
}
