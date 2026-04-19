import { Suspense } from "react";

import Header from "@/components/layout/Header";
import { JobFiltersUrlBar } from "@/components/jobs/filters/JobFiltersUrlBar";
import { JobList } from "@/components/jobs/ui/JobList";
import { PageHeading } from "@/components/layout/PageHeading";
import { fetchJobs } from "@/lib/api/jobs";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/jobFilters";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const jobs = await fetchJobs();
  const filters = parseFiltersFromSearchParams(await searchParams);
  const filtered = applyFilters(jobs, filters);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <PageHeading
          title="Job Postings"
          description="Manage and track all your open positions."
        />
        <Suspense
          fallback={<div className="h-20 rounded-lg border border-border/60" />}
        >
          <JobFiltersUrlBar total={filtered.length} />
        </Suspense>
        <JobList jobs={filtered} />
      </main>
    </div>
  );
}
