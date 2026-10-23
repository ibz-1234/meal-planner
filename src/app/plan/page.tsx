import PlanResults from "@/components/PlanResults";
import RequireAuth from "@/components/RequireAuth";

export default function PlanPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <RequireAuth>
        <PlanResults />
      </RequireAuth>
    </div>
  );
}
