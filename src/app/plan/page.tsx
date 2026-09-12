import { Suspense } from "react";
import PlanResults from "@/components/PlanResults";

export default function PlanPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="p-8 text-center text-muted">Loading your plan…</div>}>
        <PlanResults />
      </Suspense>
    </div>
  );
}
