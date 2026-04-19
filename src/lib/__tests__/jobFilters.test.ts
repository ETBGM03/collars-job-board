import { describe, expect, it } from "vitest";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/jobFilters";
import type { Job } from "@/types/job";

const makeJob = (overrides: Partial<Job> = {}): Job => ({
  id: crypto.randomUUID(),
  title: "Test Job",
  trade: "Electrician",
  location: "Austin, TX",
  jobType: "Full-time",
  description: "A test job description",
  status: "Active",
  createdAt: new Date().toISOString(),
  ...overrides,
});

const JOBS: Job[] = [
  makeJob({ title: "Master Electrician", trade: "Electrician", jobType: "Full-time", createdAt: "2026-01-01T00:00:00Z" }),
  makeJob({ title: "Commercial Plumber", trade: "Plumber", jobType: "Contract", createdAt: "2026-03-01T00:00:00Z" }),
  makeJob({ title: "HVAC Technician", trade: "HVAC", jobType: "Part-time", createdAt: "2026-02-01T00:00:00Z" }),
];

describe("applyFilters", () => {
  it("filters by search term across title, trade and description", () => {
    const result = applyFilters(JOBS, { search: "plumber", trade: "All", jobType: "All", sortOrder: "newest" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Commercial Plumber");
  });

  it("filters by trade", () => {
    const result = applyFilters(JOBS, { search: "", trade: "HVAC", jobType: "All", sortOrder: "newest" });
    expect(result).toHaveLength(1);
    expect(result[0].trade).toBe("HVAC");
  });

  it("filters by jobType", () => {
    const result = applyFilters(JOBS, { search: "", trade: "All", jobType: "Contract", sortOrder: "newest" });
    expect(result).toHaveLength(1);
    expect(result[0].jobType).toBe("Contract");
  });

  it("sorts newest first by default", () => {
    const result = applyFilters(JOBS, { search: "", trade: "All", jobType: "All", sortOrder: "newest" });
    expect(result[0].createdAt > result[1].createdAt).toBe(true);
  });

  it("sorts oldest first when specified", () => {
    const result = applyFilters(JOBS, { search: "", trade: "All", jobType: "All", sortOrder: "oldest" });
    expect(result[0].createdAt < result[1].createdAt).toBe(true);
  });
});

describe("parseFiltersFromSearchParams", () => {
  it("falls back to 'All' for invalid trade and jobType values", () => {
    const result = parseFiltersFromSearchParams({ trade: "Hacker", type: "FullTime" });
    expect(result.trade).toBe("All");
    expect(result.jobType).toBe("All");
  });
});
