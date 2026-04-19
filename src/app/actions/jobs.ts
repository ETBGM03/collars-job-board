"use server";

import { postJob } from "@/lib/api/jobs";
import { updateTag } from "next/cache";
import type { Job } from "@/types/job";

export async function createJobAction(job: Job): Promise<void> {
  await postJob(job);
  updateTag("jobs");
}
