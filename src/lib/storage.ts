import type { Job } from "@/types/job";

const STORAGE_KEY = "collars_jobs";

export function getJobs(): Job[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveJobs(jobs: Job[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function addJob(job: Job): void {
  const jobs = getJobs();
  saveJobs([job, ...jobs]);
}