import { describe, expect, it } from "vitest";
import { getDefaultFinanceState, mergeFinanceState } from "./admin-data";

describe("mergeFinanceState", () => {
  it("keeps defaults when state is missing", () => {
    const merged = mergeFinanceState(null);
    const defaults = getDefaultFinanceState();
    expect(merged.hustles).toEqual(defaults.hustles);
    expect(merged.accounts).toEqual(defaults.accounts);
    expect(merged.entries).toEqual(defaults.entries);
    expect(merged.expenses).toEqual(defaults.expenses);
    expect(merged.income).toEqual(defaults.income);
  });

  it("preserves provided income entries", () => {
    const merged = mergeFinanceState({
      hustles: [],
      accounts: [],
      entries: [],
      expenses: [],
      income: [
        {
          id: "inc-1",
          client: "Acme",
          amount: 1200,
          date: "2026-04-03",
          status: "paid",
          method: "Bank",
          notes: "Milestone 1",
        },
      ],
    });

    expect(merged.income).toHaveLength(1);
    expect(merged.income[0].client).toBe("Acme");
  });
});
