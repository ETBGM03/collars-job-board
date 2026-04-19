import { JobFiltersUrlBar } from "@/components/jobs/filters/JobFiltersUrlBar";
import { JobList } from "@/components/jobs/ui/JobList";
import { fetchJobs } from "@/lib/api/jobs";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/jobFilters";

interface JobBoardProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function JobBoard({ searchParams }: JobBoardProps) {
  const jobs = await fetchJobs();
  const filters = parseFiltersFromSearchParams(await searchParams);
  const filtered = applyFilters(jobs, filters);

  return (
    <>
      <JobFiltersUrlBar total={filtered.length} />
      <JobList jobs={filtered} />
    </>
  );
}
