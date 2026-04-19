import Link from "next/link";

export function JobListEmpty() {
  return (
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
  );
}
