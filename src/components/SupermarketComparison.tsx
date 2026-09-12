"use client";

import type { UKStore } from "@/lib/types";
import type { StoreBasketTotal } from "@/lib/grocery-prices";
import { useCurrency } from "@/contexts/CurrencyContext";
import { UK_STORES } from "@/lib/grocery-prices";
import { getStoresForCountry } from "@/lib/stores";

interface Props {
  comparison: StoreBasketTotal[];
  selectedStore: UKStore;
  onSelectStore: (store: UKStore) => void;
  useLoyalty: boolean;
  onToggleLoyalty: (value: boolean) => void;
  priceDate?: string;
}

export default function SupermarketComparison({
  comparison,
  selectedStore,
  onSelectStore,
  useLoyalty,
  onToggleLoyalty,
  priceDate,
}: Props) {
  const { format } = useCurrency();

  const storeMeta = new Map(
    getStoresForCountry("GB").map((s) => [s.name, s])
  );

  const cheapest = comparison[0];
  const dearest = comparison[comparison.length - 1];
  const selectedRow = comparison.find((c) => c.store === selectedStore) ?? cheapest;

  const savingVsCheapest =
    selectedRow && !selectedRow.isCheapest
      ? Math.round((selectedRow.total - cheapest.total) * 100) / 100
      : 0;

  return (
    <section className="space-y-5">
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Your weekly shop</p>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              {selectedStore}
            </h2>
            <p className="text-sm text-muted">
              {priceDate ? `Prices checked ${priceDate}` : "Estimated basket"}
            </p>
          </div>
          <div className="text-right">
            <p className="font-serif text-5xl font-bold">{format(selectedRow.total)}</p>
            {selectedRow.isCheapest ? (
              <p className="mt-1 text-sm text-accent">
                Cheapest option this week
              </p>
            ) : (
              <p className="mt-1 text-sm text-muted">
                Switch to <strong>{cheapest.store}</strong> saves{" "}
                <span className="font-semibold text-accent">
                  {format(savingVsCheapest)}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-primary p-5 text-white sm:p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-primary-light">Best basket</p>
              <p className="font-serif text-3xl font-bold">{cheapest.store}</p>
              <p className="text-sm text-primary-light">
                Save {format(Math.round((dearest.total - cheapest.total) * 100) / 100)} vs {dearest.store}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-serif text-4xl font-bold">{format(cheapest.total)}</p>
              {cheapest.store !== selectedStore && (
                <button
                  onClick={() => onSelectStore(cheapest.store)}
                  className="mt-2 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary-light"
                >
                  Switch to {cheapest.store} →
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-muted">Where do you shop?</p>
          <div className="flex flex-wrap gap-2">
            {UK_STORES.map((store) => (
              <button
                key={store}
                type="button"
                onClick={() => onSelectStore(store)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedStore === store
                    ? "border-primary bg-primary text-white"
                    : "border-card-border hover:border-primary hover:text-primary"
                }`}
              >
                {store}
              </button>
            ))}
          </div>

          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-card-border bg-background p-3">
            <input
              type="checkbox"
              checked={useLoyalty}
              onChange={(e) => onToggleLoyalty(e.target.checked)}
              className="h-5 w-5 accent-primary"
            />
            <div>
              <p className="text-sm font-medium">Use loyalty prices</p>
              <p className="text-xs text-muted">
                Applies Tesco Clubcard & Sainsbury&apos;s Nectar prices where available
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="mb-4 font-serif text-xl font-bold">Store comparison</h3>
        <div className="space-y-3">
          {comparison.map((row, i) => {
            const meta = storeMeta.get(row.store);
            return (
              <div
                key={row.store}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
                  row.isCheapest
                    ? "border-primary bg-primary-light/30"
                    : row.store === selectedStore
                    ? "border-accent/50 bg-accent/10"
                    : "border-card-border hover:border-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{row.store}</span>
                      {row.isCheapest && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                          Cheapest
                        </span>
                      )}
                      {row.store === selectedStore && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
                          Selected
                        </span>
                      )}
                    </div>
                    {meta && <p className="text-xs text-muted">{meta.note}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-serif text-lg font-bold ${row.isCheapest ? "text-primary" : ""}`}>
                    {format(row.total)}
                  </p>
                  {row.total !== dearest.total && (
                    <p className="text-xs text-accent">
                      Save {format(Math.round((dearest.total - row.total) * 100) / 100)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {priceDate && (
        <p className="text-center text-xs text-muted">
          Prices are curated estimates, not live checkout totals. Last updated{" "}
          {priceDate}.
        </p>
      )}
    </section>
  );
}
