"use client";

import { useState } from "react";
import type { BasketProduct } from "@/lib/types";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatProductAmount } from "@/lib/grocery-prices";

export default function ShoppingList({
  basket,
  priceDate,
}: {
  basket: BasketProduct[];
  priceDate?: string;
}) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const { format } = useCurrency();

  const toggleCheck = (ingredient: string) => {
    const next = new Set(checkedItems);
    if (next.has(ingredient)) {
      next.delete(ingredient);
    } else {
      next.add(ingredient);
    }
    setCheckedItems(next);
  };

  const categories = Array.from(new Set(basket.map((i) => i.product.category)));
  const totalCost = basket.reduce((sum, i) => sum + i.totalPrice, 0);
  const checkedCount = checkedItems.size;

  return (
    <div className="rounded-xl border border-card-border bg-card p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold">Your basket</h3>
          <p className="text-sm text-muted">
            {basket.reduce((sum, i) => sum + i.packsNeeded, 0)} products
            {priceDate ? ` · prices checked ${priceDate}` : ""}
          </p>
        </div>
        <div className="text-xl font-bold text-primary">{format(totalCost)}</div>
      </div>

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${basket.length > 0 ? (checkedCount / basket.length) * 100 : 0}%`,
          }}
        />
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-5">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
            {category}
          </h4>
          <ul className="space-y-2">
            {basket
              .filter((i) => i.product.category === category)
              .map((item) => {
                const isChecked = checkedItems.has(item.ingredient);
                const usedDisplay = formatProductAmount(
                  item.totalUsed,
                  item.displayUnit
                );
                const packDisplay = formatProductAmount(
                  item.product.packAmount,
                  item.product.unit
                );
                const leftoverDisplay = formatProductAmount(
                  item.leftover,
                  item.displayUnit
                );

                return (
                  <li
                    key={item.ingredient}
                    className={`flex cursor-pointer flex-col rounded-xl border p-3 transition-colors hover:bg-background sm:flex-row sm:items-center sm:justify-between ${
                      isChecked
                        ? "border-primary-light/50 bg-primary-light/20 opacity-60"
                        : "border-card-border"
                    }`}
                    onClick={() => toggleCheck(item.ingredient)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                          isChecked
                            ? "border-primary bg-primary"
                            : "border-card-border"
                        }`}
                      >
                        {isChecked && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isChecked ? "line-through text-muted" : "text-foreground"
                          }`}
                        >
                          {item.packsNeeded} x {item.product.productName}
                        </p>
                        <p className="text-xs text-muted">
                          Uses {usedDisplay} of {packDisplay} · {leftoverDisplay} left over
                        </p>
                      </div>
                    </div>
                    <span
                      className={`mt-2 text-right text-sm font-semibold sm:mt-0 ${
                        isChecked ? "text-muted" : "text-primary"
                      }`}
                    >
                      {format(item.totalPrice)}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}

      <p className="text-xs text-muted">
        Whole-pack pricing is how much you actually spend at the till. Chef carries
        leftover portions from one meal to the next where possible.
      </p>
    </div>
  );
}
