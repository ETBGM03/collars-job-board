import type { Job } from "@/types/job";
import { createJob, listJobs } from "@/lib/jobsStore";

export async function fetchJobs(): Promise<Job[]> {
  return await listJobs();
}

export async function postJob(job: Job): Promise<Job> {
  return await createJob(job);
}

