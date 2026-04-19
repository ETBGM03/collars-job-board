import { NextResponse } from "next/server";
import { fetchJobs, postJob } from "@/lib/api/jobs";
import type { Job } from "@/types/job";

export async function GET() {
  const jobs = await fetchJobs();
  return NextResponse.json({ jobs });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { job?: Job };
  if (!body.job) {
    return NextResponse.json({ error: "Missing job" }, { status: 400 });
  }
  const job = await postJob(body.job);
  return NextResponse.json({ job }, { status: 201 });
}

