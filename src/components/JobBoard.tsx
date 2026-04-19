"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JobCard } from "@/components/JobCard";
import { JobFiltersBar } from "@/components/JobFilters";
import { Button } from "@/components/ui/button";
import { getJobs, saveJobs } from "@/lib/storage";
import { SEED_JOBS } from "@/lib/seed";
import type { Job, JobFilters } from "@/types/job";
import { Plus, HardHat } from "lucide-react";

const DEFAULT_FILTERS: JobFilters = {
  search: "",
  trade: "All",
  jobType: "All",
  sortOrder: "newest",
};

function applyFilters(jobs: Job[], filters: JobFilters): Job[] {
  let result = [...jobs];

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.trade.toLowerCase().includes(q),
    );
  }

  if (filters.trade !== "All") {
    result = result.filter((j) => j.trade === filters.trade);
  }

  if (filters.jobType !== "All") {
    result = result.filter((j) => j.jobType === filters.jobType);
  }

  result.sort((a, b) => {
    const diff =
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return filters.sortOrder === "newest" ? -diff : diff;
  });

  return result;
}

export function JobBoard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<JobFilters>(DEFAULT_FILTERS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getJobs();
    if (stored.length === 0) {
      saveJobs(SEED_JOBS);
      setJobs(SEED_JOBS);
    } else {
      setJobs(stored);
    }
    setMounted(true);
  }, []);

  const filtered = applyFilters(jobs, filters);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-primary/10">
              <HardHat className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-base leading-none">Collars</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Employer Job Board
              </p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/new")}
            size="sm"
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Post a Job
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Job Postings</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and track all your open positions.
          </p>
        </div>

        <JobFiltersBar
          filters={filters}
          onChange={setFilters}
          total={filtered.length}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <p className="text-muted-foreground font-medium">No jobs found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or{" "}
              <button
                onClick={() => router.push("/new")}
                className="text-primary underline-offset-4 hover:underline"
              >
                post a new job
              </button>
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
