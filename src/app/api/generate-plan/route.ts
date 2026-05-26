import { generateWeeklyPlan } from "@/lib/plan-generator";
import type { UserPreferences } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as UserPreferences;

  if (!body.budget || !body.fitnessGoal || !body.householdSize) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const plan = generateWeeklyPlan(body);

  return Response.json(plan);
}
