import type { Job, JobFilters, JobType, TradeCategory } from "@/types/job";
import { JOB_TYPES, TRADES } from "@/constants/jobBoard.constants";

export function parseFiltersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): JobFilters {
  const search = typeof searchParams.q === "string" ? searchParams.q : "";

  const rawTrade = searchParams.trade;
  const trade: TradeCategory | "All" =
    typeof rawTrade === "string" &&
    (TRADES as readonly string[]).includes(rawTrade)
      ? (rawTrade as TradeCategory)
      : "All";

  const rawJobType = searchParams.type;
  const jobType: JobType | "All" =
    typeof rawJobType === "string" &&
    (JOB_TYPES as readonly string[]).includes(rawJobType)
      ? (rawJobType as JobType)
      : "All";
  const sortOrder =
    searchParams.sort === "oldest" || searchParams.sort === "newest"
      ? searchParams.sort
      : "newest";

  return { search, trade, jobType, sortOrder };
}

export function applyFilters(jobs: Job[], filters: JobFilters): Job[] {
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

