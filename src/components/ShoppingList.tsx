"use client";

import { useState } from "react";
import type { ShoppingListItem } from "@/lib/types";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function ShoppingList({ items }: { items: ShoppingListItem[] }) {
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

  const categories = Array.from(new Set(items.map((i) => i.category)));
  const totalCost = items.reduce((sum, i) => sum + i.estimatedCost, 0);
  const checkedCount = checkedItems.size;

  return (
    <div className="rounded-xl border border-card-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Shopping List</h3>
        <div className="text-sm text-muted">
          {checkedCount}/{items.length} items ·{" "}
          <span className="font-semibold text-primary">{format(totalCost)}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${items.length > 0 ? (checkedCount / items.length) * 100 : 0}%`,
          }}
        />
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-4">
          <h4 className="mb-2 text-sm font-semibold text-muted uppercase tracking-wide">
            {category}
          </h4>
          <ul className="space-y-1">
            {items
              .filter((i) => i.category === category)
              .map((item) => {
                const isChecked = checkedItems.has(item.ingredient);
                return (
                  <li
                    key={item.ingredient}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-background ${
                      isChecked ? "opacity-50" : ""
                    }`}
                    onClick={() => toggleCheck(item.ingredient)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
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
                      <span
                        className={`text-sm ${
                          isChecked ? "line-through text-muted" : "text-foreground"
                        }`}
                      >
                        {item.ingredient}
                      </span>
                      <span className="text-xs text-muted">
                        ({item.totalQuantity})
                      </span>
                    </div>
                    <span className="text-sm font-medium text-primary">{format(item.estimatedCost)}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}
