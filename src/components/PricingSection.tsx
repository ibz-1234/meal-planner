const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "1 weekly meal plan",
      "Basic shopping list",
      "3 dietary preferences",
      "Standard recipes",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    features: [
      "Unlimited meal plans",
      "Smart shopping list with coupons",
      "All dietary preferences",
      "AI recipe customization",
      "Macro tracking dashboard",
      "Priority support",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Family",
    price: "$14.99",
    period: "/month",
    features: [
      "Everything in Premium",
      "Up to 8 family profiles",
      "Shared shopping lists",
      "Family meal scheduling",
      "Bulk recipe scaling",
      "Recipe partnership exclusives",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
          <p className="mt-3 text-muted">
            Start free. Upgrade when you need more features.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 transition-all hover:shadow-lg ${
                plan.featured
                  ? "border-primary bg-card shadow-md"
                  : "border-card-border bg-card"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-muted">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <svg
                      className="h-4 w-4 shrink-0 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 w-full rounded-xl py-3 text-sm font-bold transition-all ${
                  plan.featured
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "border border-card-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
