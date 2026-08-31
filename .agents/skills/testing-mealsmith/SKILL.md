---
name: testing-mealsmith
description: Test the Mealsmith meal-plan site end-to-end (plan generation, meal swap, favourites, UK store comparison). Use when verifying changes to the meal planner UI, pricing, or deploy.
---

# Testing Mealsmith

## Where the app runs
- Live static deploy: https://mealsmith.surge.sh (Surge hosting of the Next.js static export in `out/`).
- Local: `npm run build` produces `out/`; serve with any static server. `npm run lint` before committing.
- Deploy: `printf '%s\n%s\n' "$SURGE_EMAIL" "$SURGE_PASSWORD" | npx --yes surge ./out mealsmith.surge.sh`.

## Golden-path test flow
1. Homepage: click category pills (Chicken, Beef & Pork, Plant-Based) — featured recipes and photos must change and match dish names (mapping in `src/lib/meal-images.ts`).
2. Switch currency to GBP via the header country picker (site may auto-detect USD from a non-UK IP; UK store comparison assumes GBP).
3. `/preview`: a fitness goal MUST be selected before "Generate My Meal Plan" enables. Set budget/household, submit → lands on `/plan`.
4. `/plan` Meal Plan tab: each card shows matched photo, difficulty badge, "N min prep · £X per serving". Expand a card to reveal macros, ingredients, and the "⇄ Swap this meal" button; swapping must keep meal type and recalc day + weekly totals.
5. Heart a meal, reload — favourite persists (localStorage `mmp-favourites`). The plan itself lives in sessionStorage `mealPlan`.
6. Compare Stores tab: 6 UK stores priced from the shopping list (`compareUKBasket` in `src/lib/grocery-prices.ts`); pick a preferred store to get the "switching saves £X" callout.
7. Footer links: /faq, /privacy, /terms, /contact.

## Gotchas
- Currency choice might not persist across full page reloads (observed reverting to USD in 2026-07 testing) — re-select GBP after any reload before asserting £ values.
- Prices are static, benchmarked against PriceRunner; last-updated date shown in the Compare Stores tab.
- Images must be served directly from `/public` (`images.unoptimized: true` in `next.config.ts`) — `/_next/image` URLs 404 on Surge.
- Test evidence can be hosted by copying screenshots into `out/test-evidence/` and redeploying (useful for embedding images in PR comments).

## Devin Secrets Needed
- `SURGE_EMAIL`, `SURGE_PASSWORD` — Surge.sh login for deploying to mealsmith.surge.sh.
