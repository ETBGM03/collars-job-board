import { Suspense } from "react";
import Link from "next/link";

import Header from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { JobFiltersUrlBar } from "@/components/JobFiltersUrlBar";
import { fetchJobs } from "@/lib/api/jobs";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/jobFilters";
import type { Job } from "@/types/job";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const jobs: Job[] = await fetchJobs();
  const resolvedSearchParams = await searchParams;
  const filters = parseFiltersFromSearchParams(resolvedSearchParams);
  const filtered = applyFilters(jobs, filters);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Job Postings</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and track all your open positions.
          </p>
        </div>

        <Suspense
          fallback={<div className="h-20 rounded-lg border border-border/60" />}
        >
          <JobFiltersUrlBar total={filtered.length} />
        </Suspense>

        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <p className="text-muted-foreground font-medium">No jobs found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or{" "}
              <Link
                href="/new"
                className="text-primary underline-offset-4 hover:underline"
              >
                post a new job
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
