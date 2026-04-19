import Link from "next/link";
import { JobForm } from "@/components/form/JobForm";
import { ArrowLeft, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewJobPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild aria-label="Go back">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
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
        </div>
      </header>

      {/* Main */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Post a New Job</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Fill in the details below to create a new job posting.
          </p>
        </div>

        <div className="border border-border/60 rounded-xl p-6 bg-card">
          <JobForm />
        </div>
      </main>
    </div>
  );
}
