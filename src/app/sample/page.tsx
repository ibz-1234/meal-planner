import Image from "next/image";
import { SAMPLE_IMAGES } from "@/lib/meal-images";

export default function SamplePage() {
  const meals = [
    { title: "Monday", name: "Greek Yogurt Parfait", note: "350 cal · 22g protein" },
    { title: "Tuesday", name: "Chicken Caesar Salad", note: "480 cal · 35g protein" },
    { title: "Wednesday", name: "Chicken Katsu Curry", note: "560 cal · 36g protein" },
    { title: "Thursday", name: "Apple & Almond Butter", note: "200 cal · 5g protein" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="rounded-3xl border border-card-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Sample plan
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">What the plan looks like</h1>
        <p className="mt-3 max-w-2xl text-muted">
          A quick look at the style of the weekly view, with meal cards, macro
          totals, and shopping list logic underneath.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {meals.map((meal, index) => (
          <article
            key={meal.title}
            className="overflow-hidden rounded-3xl border border-card-border bg-card shadow-sm"
          >
            <Image
              src={SAMPLE_IMAGES[index % SAMPLE_IMAGES.length]}
              alt={meal.name}
              width={800}
              height={550}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {meal.title}
              </p>
              <h2 className="mt-2 text-xl font-bold">{meal.name}</h2>
              <p className="mt-1 text-sm text-muted">{meal.note}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
