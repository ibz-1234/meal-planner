const FAQS = [
  {
    q: "How does Mealsmith work?",
    a: "Tell us your budget, household size and dietary needs, and we generate a full week of meals with a shopping list in seconds. Every plan is priced against Tesco, Aldi, Lidl, Asda, Morrisons and Sainsbury's so you can see the cheapest place to shop.",
  },
  {
    q: "Do I need an account to try it?",
    a: "No — you can generate a sample plan straight away without signing up. Creating a free account just lets you save plans and favourites in your browser.",
  },
  {
    q: "How accurate are the grocery prices?",
    a: "Ingredient prices are benchmarked against PriceRunner and each supermarket's online shop, per pack, per store. They're refreshed regularly, but promotions and regional differences mean your checkout total may vary slightly.",
  },
  {
    q: "Can I change a meal I don't fancy?",
    a: "Yes — open any meal in your plan and tap “Swap this meal” to instantly replace it with another that fits your preferences. Costs and the shopping list update automatically.",
  },
  {
    q: "Which diets do you support?",
    a: "Vegetarian, vegan, gluten-free, dairy-free and more, plus common allergy filters like nuts. Set them once in the plan builder.",
  },
  {
    q: "Is Mealsmith free?",
    a: "The Starter plan is free — 3 meal plans per month with shopping lists and price comparison. Premium unlocks unlimited plans, price-drop alerts, macro tracking and more.",
  },
  {
    q: "Which countries are supported?",
    a: "The supermarket price comparison is built for the UK. You can still use Mealsmith elsewhere — prices convert to your local currency with a store comparison for your country.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
        FAQ
      </p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
        Frequently asked questions
      </h1>
      <div className="mt-8 space-y-4">
        {FAQS.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-2xl border border-card-border bg-card p-5 shadow-sm"
          >
            <summary className="cursor-pointer list-none font-semibold text-foreground">
              {faq.q}
            </summary>
            <p className="mt-3 text-sm text-muted">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
