import { JobFormData, JobStatus, JobType, TradeCategory } from "@/types/job";

export const TRADES: TradeCategory[] = [
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

export const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract"];
export const STATUSES: JobStatus[] = ["Active", "Draft", "Closed"];

export const EMPTY_FORM: JobFormData = {
  title: "",
  trade: "",
  location: "",
  jobType: "",
  payMin: "",
  payMax: "",
  description: "",
  status: "Active",
};
