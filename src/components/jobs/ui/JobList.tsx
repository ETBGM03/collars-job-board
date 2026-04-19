import { JobCard } from "@/components/jobs/ui/JobCard";
import type { Job } from "@/types/job";
import { JobListEmpty } from "./JobListEmpty";

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return <JobListEmpty />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
