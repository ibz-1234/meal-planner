import PreferencesForm from "@/components/PreferencesForm";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-light/30 to-background py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-sm font-semibold text-primary">
              AI-Powered Meal Planning
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Eat Smart.{" "}
              <span className="text-primary">Save Money.</span>
              <br />
              Waste Nothing.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Enter your budget, fitness goals, and dietary needs. Our AI creates
              personalized weekly meal plans, generates shopping lists, and finds
              the cheapest supermarkets — all while reducing food waste.
            </p>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "30%", label: "Avg. Savings" },
              { value: "50+", label: "Recipes" },
              { value: "5 min", label: "Plan Generation" },
              { value: "0", label: "Food Wasted" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-card-border bg-card p-4 text-center"
              >
                <p className="text-2xl font-extrabold text-primary">{stat.value}</p>
                <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Set Your Preferences",
                desc: "Enter your budget, fitness goals, dietary restrictions, and household size.",
                icon: "🎯",
              },
              {
                step: "2",
                title: "Get Your Plan",
                desc: "Our AI generates a full weekly meal plan with recipes, macros, and costs.",
                icon: "🤖",
              },
              {
                step: "3",
                title: "Shop & Save",
                desc: "Use your smart shopping list and compare prices across supermarkets.",
                icon: "🛒",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-card-border bg-card p-6 text-center transition-shadow hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-2xl">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preferences Form */}
      <section className="py-16 bg-background" id="plan">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="mb-2 text-center text-3xl font-bold">
            Create Your Meal Plan
          </h2>
          <p className="mb-8 text-center text-muted">
            Tell us about yourself and we&apos;ll build the perfect plan for you.
          </p>
          <PreferencesForm />
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">
            Everything You Need
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "📅",
                title: "Weekly Meal Plans",
                desc: "Full 7-day plans with breakfast, lunch, dinner, and snacks tailored to your goals.",
              },
              {
                icon: "📝",
                title: "Smart Shopping Lists",
                desc: "Auto-generated, organized by category with quantities and cost estimates.",
              },
              {
                icon: "💰",
                title: "Price Comparison",
                desc: "Compare prices across major supermarkets to find the best deals.",
              },
              {
                icon: "♻️",
                title: "Waste Reduction",
                desc: "Tips and strategies to minimize food waste and save money.",
              },
              {
                icon: "💪",
                title: "Macro Tracking",
                desc: "Detailed nutritional breakdown with calories, protein, carbs, and fat.",
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family Friendly",
                desc: "Scale recipes for any household size from 1 to 12 people.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-card-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="mt-2 font-bold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-10 text-white">
            <h2 className="text-3xl font-bold">
              Ready to Transform Your Meals?
            </h2>
            <p className="mt-3 opacity-90">
              Join thousands of users saving money and eating healthier with
              AI-powered meal planning.
            </p>
            <a
              href="#plan"
              className="mt-6 inline-block rounded-xl bg-white px-8 py-3 font-bold text-primary transition-all hover:shadow-lg"
            >
              Create Your Free Plan
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
