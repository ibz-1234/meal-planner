export default function WasteReductionTips({ tips }: { tips: string[] }) {
  return (
    <div className="rounded-xl border border-card-border bg-card p-6">
      <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
        <span>♻️</span> Reduce Food Waste
      </h3>
      <ul className="space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex gap-3 rounded-lg bg-background p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
              {i + 1}
            </span>
            <p className="text-sm text-muted">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
