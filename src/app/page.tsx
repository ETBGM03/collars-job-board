import { Suspense } from "react";

import Header from "@/components/layout/Header";
import { JobBoard } from "@/components/jobs/ui/JobBoard";
import { PageHeading } from "@/components/layout/PageHeading";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <PageHeading
          title="Job Postings"
          description="Manage and track all your open positions."
        />
        <Suspense fallback={<div className="h-40 rounded-lg border border-border/60 animate-pulse bg-muted/30" />}>
          <JobBoard searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
