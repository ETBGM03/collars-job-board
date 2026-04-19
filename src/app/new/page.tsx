import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { JobForm } from "@/components/form/JobForm";
import { PageHeading } from "@/components/layout/PageHeading";

export default function NewJobPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </Link>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <PageHeading
          title="Post a New Job"
          description="Fill in the details below to create a new job posting."
        />
        <div className="border border-border/60 rounded-xl p-6 bg-card">
          <JobForm />
        </div>
      </main>
    </div>
  );
}
