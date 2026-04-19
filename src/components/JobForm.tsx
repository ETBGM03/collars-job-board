"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  Job,
  JobFormData,
  TradeCategory,
  JobType,
  JobStatus,
} from "@/types/job";

const TRADES: TradeCategory[] = [
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

const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract"];
const STATUSES: JobStatus[] = ["Active", "Draft", "Closed"];

const EMPTY_FORM: JobFormData = {
  title: "",
  trade: "",
  location: "",
  jobType: "",
  payMin: "",
  payMax: "",
  description: "",
  status: "Active",
};

type Errors = Partial<Record<keyof JobFormData, string>>;

function validate(data: JobFormData): Errors {
  const errors: Errors = {};
  if (!data.title.trim()) errors.title = "Job title is required.";
  if (!data.trade) errors.trade = "Please select a trade.";
  if (!data.location.trim()) errors.location = "Location is required.";
  if (!data.jobType) errors.jobType = "Please select a job type.";
  if (!data.description.trim()) errors.description = "Description is required.";
  if (data.description.trim().length < 20)
    errors.description = "Description must be at least 20 characters.";
  if (data.payMin && isNaN(Number(data.payMin)))
    errors.payMin = "Must be a number.";
  if (data.payMax && isNaN(Number(data.payMax)))
    errors.payMax = "Must be a number.";
  if (data.payMin && data.payMax && Number(data.payMin) > Number(data.payMax))
    errors.payMax = "Max pay must be greater than min pay.";
  return errors;
}

interface Props {
  onSubmit: (job: Job) => void;
}

export function JobForm({ onSubmit }: Props) {
  const [form, setForm] = useState<JobFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof JobFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (submitted) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const job: Job = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      trade: form.trade as TradeCategory,
      location: form.location.trim(),
      jobType: form.jobType as JobType,
      payMin: form.payMin ? Number(form.payMin) : undefined,
      payMax: form.payMax ? Number(form.payMax) : undefined,
      description: form.description.trim(),
      status: form.status,
      createdAt: new Date().toISOString(),
    };

    onSubmit(job);
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title">
          Job Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="e.g. Senior Electrician"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-destructive">
            {errors.title}
          </p>
        )}
      </div>

      {/* Trade + Job Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="trade">
            Trade / Category <span className="text-destructive">*</span>
          </Label>
          <Select value={form.trade} onValueChange={(v) => set("trade", v)}>
            <SelectTrigger
              id="trade"
              aria-invalid={!!errors.trade}
              aria-describedby={errors.trade ? "trade-error" : undefined}
            >
              <SelectValue placeholder="Select a trade" />
            </SelectTrigger>
            <SelectContent>
              {TRADES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.trade && (
            <p id="trade-error" className="text-sm text-destructive">
              {errors.trade}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="jobType">
            Job Type <span className="text-destructive">*</span>
          </Label>
          <Select value={form.jobType} onValueChange={(v) => set("jobType", v)}>
            <SelectTrigger
              id="jobType"
              aria-invalid={!!errors.jobType}
              aria-describedby={errors.jobType ? "jobType-error" : undefined}
            >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.jobType && (
            <p id="jobType-error" className="text-sm text-destructive">
              {errors.jobType}
            </p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-1.5">
        <Label htmlFor="location">
          Location <span className="text-destructive">*</span>
        </Label>
        <Input
          id="location"
          placeholder="e.g. Austin, TX"
          value={form.location}
          onChange={(e) => set("location", e.target.value)}
          aria-invalid={!!errors.location}
          aria-describedby={errors.location ? "location-error" : undefined}
        />
        {errors.location && (
          <p id="location-error" className="text-sm text-destructive">
            {errors.location}
          </p>
        )}
      </div>

      {/* Pay range */}
      <div className="space-y-1.5">
        <Label>
          Pay Range{" "}
          <span className="text-muted-foreground text-xs">
            (optional, per hour)
          </span>
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex-1 space-y-1">
            <Input
              id="payMin"
              placeholder="Min (e.g. 25)"
              value={form.payMin}
              onChange={(e) => set("payMin", e.target.value)}
              aria-label="Minimum pay"
              aria-invalid={!!errors.payMin}
            />
            {errors.payMin && (
              <p className="text-sm text-destructive">{errors.payMin}</p>
            )}
          </div>
          <span className="text-muted-foreground text-sm shrink-0">to</span>
          <div className="flex-1 space-y-1">
            <Input
              id="payMax"
              placeholder="Max (e.g. 45)"
              value={form.payMax}
              onChange={(e) => set("payMax", e.target.value)}
              aria-label="Maximum pay"
              aria-invalid={!!errors.payMax}
            />
            {errors.payMax && (
              <p className="text-sm text-destructive">{errors.payMax}</p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe the role, requirements, and responsibilities..."
          className="min-h-32 resize-y"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
        />
        <div className="flex justify-between items-center">
          {errors.description ? (
            <p id="description-error" className="text-sm text-destructive">
              {errors.description}
            </p>
          ) : (
            <span />
          )}
          <span className="text-xs text-muted-foreground ml-auto">
            {form.description.length} chars
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="space-y-1.5">
        <Label htmlFor="status">Status</Label>
        <Select value={form.status} onValueChange={(v) => set("status", v)}>
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Post Job
      </Button>
    </form>
  );
}
