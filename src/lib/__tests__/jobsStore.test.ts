import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Job } from "@/types/job";

const mockReadFile = vi.fn();
const mockWriteFile = vi.fn();

vi.mock("node:fs/promises", () => ({
  readFile: mockReadFile,
  writeFile: mockWriteFile,
}));

const makeJob = (id: string): Job => ({
  id,
  title: "Test Job",
  trade: "Electrician",
  location: "Austin, TX",
  jobType: "Full-time",
  description: "A test job description",
  status: "Active",
  createdAt: new Date().toISOString(),
});

describe("jobsStore", () => {
  beforeEach(() => {
    vi.resetModules();
    mockReadFile.mockReset();
    mockWriteFile.mockReset();
    mockWriteFile.mockResolvedValue(undefined);
  });

  it("listJobs returns jobs from disk", async () => {
    const stored = [makeJob("1"), makeJob("2")];
    mockReadFile.mockResolvedValue(JSON.stringify(stored));

    const { listJobs } = await import("@/lib/jobsStore");
    const result = await listJobs();

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
  });

  it("listJobs falls back to seed data when file is corrupt", async () => {
    mockReadFile.mockRejectedValue(new Error("ENOENT"));

    const { listJobs } = await import("@/lib/jobsStore");
    const result = await listJobs();

    expect(Array.isArray(result)).toBe(true);
    expect(mockWriteFile).toHaveBeenCalledOnce();
  });

  it("createJob prepends the new job to the list", async () => {
    const existing = [makeJob("existing")];
    mockReadFile.mockResolvedValue(JSON.stringify(existing));

    const { createJob } = await import("@/lib/jobsStore");
    const newJob = makeJob("new");
    await createJob(newJob);

    const written = JSON.parse(mockWriteFile.mock.calls[0][1] as string) as Job[];
    expect(written[0].id).toBe("new");
    expect(written[1].id).toBe("existing");
  });

  it("createJob returns the job that was inserted", async () => {
    mockReadFile.mockResolvedValue(JSON.stringify([]));

    const { createJob } = await import("@/lib/jobsStore");
    const job = makeJob("abc");
    const result = await createJob(job);

    expect(result).toEqual(job);
  });
});
