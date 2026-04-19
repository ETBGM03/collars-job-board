"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { JobFiltersBar } from "@/components/jobs/filters/JobFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { parseFiltersFromSearchParams } from "@/lib/jobFilters";
import type { JobFilters } from "@/types/job";

function toSearchParams(filters: JobFilters) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.trade !== "All") params.set("trade", filters.trade);
  if (filters.jobType !== "All") params.set("type", filters.jobType);
  if (filters.sortOrder !== "newest") params.set("sort", filters.sortOrder);
  return params;
}

export function JobFiltersUrlBar({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const filters = useMemo(
    () => parseFiltersFromSearchParams(Object.fromEntries(searchParams.entries())),
    [searchParams],
  );

  const [draftSearch, setDraftSearch] = useState(filters.search);
  const debouncedSearch = useDebounce(draftSearch, 300);

  useEffect(() => {
    setDraftSearch(filters.search);
  }, [filters.search]);

  useEffect(() => {
    if (debouncedSearch === filters.search) return;
    const params = toSearchParams({ ...filters, search: debouncedSearch });
    startTransition(() => {
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <JobFiltersBar
      filters={{ ...filters, search: draftSearch }}
      total={total}
      onChange={(next) => {
        if (
          next.trade === filters.trade &&
          next.jobType === filters.jobType &&
          next.sortOrder === filters.sortOrder
        ) {
          setDraftSearch(next.search);
          return;
        }

        const params = toSearchParams(next);
        startTransition(() => {
          const qs = params.toString();
          router.replace(qs ? `${pathname}?${qs}` : pathname, {
            scroll: false,
          });
        });
      }}
    />
  );
}
