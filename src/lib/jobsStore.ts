import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Job } from "@/types/job";
import SEED_JOBS_RAW from '@/mock/initialSeeder.json';

const SEED_JOBS = SEED_JOBS_RAW as Job[];

const JOBS_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "mock",
  "initialSeeder.json",
);

function isJobArray(value: unknown): value is Job[] {
  return Array.isArray(value);
}

async function readJobsFromDisk(): Promise<Job[]> {
  try {
    const raw = await readFile(JOBS_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (isJobArray(parsed)) return parsed;
  } catch {
    // ignore and fall back
  }

  // If file is missing/corrupt, regenerate from seed and persist.
  await writeFile(JOBS_FILE_PATH, JSON.stringify(SEED_JOBS, null, 2) + "\n");
  return [...SEED_JOBS];
}

async function writeJobsToDisk(jobs: Job[]) {
  await writeFile(JOBS_FILE_PATH, JSON.stringify(jobs, null, 2) + "\n");
}

export async function listJobs(): Promise<Job[]> {
  const jobs = await readJobsFromDisk();
  return [...jobs];
}

export async function createJob(job: Job): Promise<Job> {
  const jobs = await readJobsFromDisk();
  const next = [job, ...jobs];
  await writeJobsToDisk(next);
  return job;
}

