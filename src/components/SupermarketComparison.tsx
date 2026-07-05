"use client";

import { useCurrency } from "@/contexts/CurrencyContext";
import { compareStores } from "@/lib/stores";

export default function SupermarketComparison({
  weeklyBasketGBP,
}: {
  weeklyBasketGBP: number;
}) {
  const { country, format } = useCurrency();
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
