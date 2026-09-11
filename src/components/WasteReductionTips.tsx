export default function WasteReductionTips({ tips }: { tips: string[] }) {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        Reduce Food Waste
      </h3>
      <ul className="space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex gap-3 rounded-xl bg-background p-3">
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
