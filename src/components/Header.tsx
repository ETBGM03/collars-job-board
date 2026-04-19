import Link from "next/link";

import { HardHat, Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="border-b border-border/60 bg-background/95 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-primary/10">
            <HardHat className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-base leading-none"> Collars </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Employer Job Board
            </p>
          </div>
        </div>
        <Button asChild size="sm" className="gap-1.5">
          <Link href="/new">
            <Plus className="h-4 w-4" />
            Post a Job
          </Link>
        </Button>
      </div>
    </header>
  );
}
