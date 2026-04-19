"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { JobFilters, TradeCategory, JobType } from "@/types/job";
import { Search } from "lucide-react";

const TRADES: (TradeCategory | "All")[] = [
  "All",
  "Electrician",
  "Plumber",
  "HVAC",
  "Welder",
  "Carpenter",
  "Mason",
  "Painter",
  "Roofer",
  "Pipefitter",
  "General Labor",
];

const JOB_TYPES: (JobType | "All")[] = [
  "All",
  "Full-time",
  "Part-time",
  "Contract",
];

interface Props {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
  total: number;
}

export function JobFiltersBar({ filters, onChange, total }: Props) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search job title or keyword..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          aria-label="Search jobs"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Select
          value={filters.trade}
          onValueChange={(v) =>
            onChange({ ...filters, trade: v as TradeCategory | "All" })
          }
        >
          <SelectTrigger className="w-40" aria-label="Filter by trade">
            <SelectValue placeholder="Trade" />
          </SelectTrigger>
          <SelectContent>
            {TRADES.map((t) => (
              <SelectItem key={t} value={t}>
                {t === "All" ? "All Trades" : t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.jobType}
          onValueChange={(v) =>
            onChange({ ...filters, jobType: v as JobType | "All" })
          }
        >
          <SelectTrigger className="w-36" aria-label="Filter by job type">
            <SelectValue placeholder="Job type" />
          </SelectTrigger>
          <SelectContent>
            {JOB_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t === "All" ? "All Types" : t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sortOrder}
          onValueChange={(v) =>
            onChange({ ...filters, sortOrder: v as "newest" | "oldest" })
          }
        >
          <SelectTrigger className="w-36" aria-label="Sort order">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>

        <span className="ml-auto self-center text-sm text-muted-foreground">
          {total} {total === 1 ? "posting" : "postings"}
        </span>
      </div>
    </div>
  );
}
