import { describe, expect, it } from "vitest";
import { getDefaultWorkState, mergeWorkState } from "./admin-work";

describe("mergeWorkState", () => {
  it("fills missing sections with defaults", () => {
    const merged = mergeWorkState({ tasks: [], projects: [] } as never);
    const defaults = getDefaultWorkState();
    expect(merged.tasks).toEqual([]);
    expect(merged.projects).toEqual([]);
    expect(merged.reminders).toEqual(defaults.reminders);
    expect(merged.clients).toEqual(defaults.clients);
    expect(merged.leads).toEqual(defaults.leads);
    expect(merged.focusCategories).toEqual(defaults.focusCategories);
  });
});
