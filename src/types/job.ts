export type JobType = "Full-time" | "Part-time" | "Contract";

export type JobStatus = "Active" | "Draft" | "Closed";

export type TradeCategory =
  | "Electrician"
  | "Plumber"
  | "HVAC"
  | "Welder"
  | "Carpenter"
  | "Mason"
  | "Painter"
  | "Roofer"
  | "Pipefitter"
  | "General Labor";

export interface Job {
  id: string;
  title: string;
  trade: TradeCategory;
  location: string;
  jobType: JobType;
  payMin?: number;
  payMax?: number;
  description: string;
  status: JobStatus;
  createdAt: string; // ISO string
}

export interface JobFormData {
  title: string;
  trade: TradeCategory | "";
  location: string;
  jobType: JobType | "";
  payMin: string;
  payMax: string;
  description: string;
  status: JobStatus;
}

export interface JobFilters {
  search: string;
  trade: TradeCategory | "All";
  jobType: JobType | "All";
  sortOrder: "newest" | "oldest";
}