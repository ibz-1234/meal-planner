import type { SupermarketPrice } from "@/lib/types";

export default function SupermarketComparison({
  stores,
}: {
  stores: SupermarketPrice[];
}) {
  return (
    <div className="rounded-xl border border-card-border bg-card p-6">
      <h3 className="mb-4 text-lg font-bold">Store Price Comparison</h3>
      <p className="mb-4 text-sm text-muted">
        Estimated total grocery cost at each store. Prices are approximate.
      </p>
      <div className="space-y-3">
        {stores.map((store, i) => {
          const isCheapest = i === 0;
          return (
            <a
              key={store.store}
              href={store.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between rounded-xl border p-4 transition-all hover:shadow-md ${
                isCheapest
                  ? "border-primary bg-primary-light/30"
                  : "border-card-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{store.logo}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{store.store}</span>
                    {isCheapest && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                        Best Price
                      </span>
                    )}
                  </div>
                  {store.savings > 0 && (
                    <p className="text-xs text-primary">
                      Save ${store.savings.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">
                  ${store.totalEstimatedCost.toFixed(2)}
                </p>
                <p className="text-xs text-muted">estimated total</p>
              </div>
            </a>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted text-center">
        Links may contain affiliate partnerships. We may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
