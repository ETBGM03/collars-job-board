"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/form/FormField";
import { ControlledSelect } from "@/components/form/ControlledSelect";
import { createJobAction } from "@/app/actions/jobs";
import type {
  JobFormData,
  TradeCategory,
  JobType,
  JobStatus,
} from "@/types/job";
import {
  EMPTY_FORM,
  JOB_TYPES,
  STATUSES,
  TRADES,
} from "@/constants/jobBoard.constants";

export function JobForm() {
  const router = useRouter();
  const [descLength, setDescLength] = useState(0);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({ defaultValues: EMPTY_FORM });

  async function onSubmit(data: JobFormData) {
    await createJobAction({
      id: crypto.randomUUID(),
      title: data.title.trim(),
      trade: data.trade as TradeCategory,
      location: data.location.trim(),
      jobType: data.jobType as JobType,
      payMin: data.payMin ? Number(data.payMin) : undefined,
      payMax: data.payMax ? Number(data.payMax) : undefined,
      description: data.description.trim(),
      status: data.status as JobStatus,
      createdAt: new Date().toISOString(),
    });
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField
        id="title"
        label="Job Title"
        required
        error={errors.title?.message}
      >
        <Input
          id="title"
          placeholder="e.g. Senior Electrician"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
          {...register("title", { required: "Job title is required." })}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ControlledSelect
          name="trade"
          control={control}
          label="Trade / Category"
          placeholder="Select a trade"
          options={TRADES}
          required
          error={errors.trade?.message}
        />
        <ControlledSelect
          name="jobType"
          control={control}
          label="Job Type"
          placeholder="Select type"
          options={JOB_TYPES}
          required
          error={errors.jobType?.message}
        />
      </div>

      <FormField
        id="location"
        label="Location"
        required
        error={errors.location?.message}
      >
        <Input
          id="location"
          placeholder="e.g. Austin, TX"
          aria-invalid={!!errors.location}
          aria-describedby={errors.location ? "location-error" : undefined}
          {...register("location", { required: "Location is required." })}
        />
      </FormField>

      <div className="space-y-1.5">
        <span className="text-sm font-medium leading-none">
          Pay Range{" "}
          <span className="text-muted-foreground text-xs font-normal">
            (optional, per hour)
          </span>
        </span>
        <div className="flex items-center gap-3">
          <div className="flex-1 space-y-1">
            <Input
              id="payMin"
              placeholder="Min (e.g. 25)"
              aria-label="Minimum pay"
              aria-invalid={!!errors.payMin}
              {...register("payMin", {
                validate: (v) => !v || !isNaN(Number(v)) || "Must be a number.",
              })}
            />
            {errors.payMin && (
              <p className="text-sm text-destructive">
                {errors.payMin.message}
              </p>
            )}
          </div>
          <span className="text-muted-foreground text-sm shrink-0">to</span>
          <div className="flex-1 space-y-1">
            <Input
              id="payMax"
              placeholder="Max (e.g. 45)"
              aria-label="Maximum pay"
              aria-invalid={!!errors.payMax}
              {...register("payMax", {
                validate: (v, all) => {
                  if (v && isNaN(Number(v))) return "Must be a number.";
                  if (all.payMin && v && Number(all.payMin) > Number(v))
                    return "Max pay must be greater than min pay.";
                  return true;
                },
              })}
            />
            {errors.payMax && (
              <p className="text-sm text-destructive">
                {errors.payMax.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <FormField
        id="description"
        label="Description"
        required
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          placeholder="Describe the role, requirements, and responsibilities..."
          className="min-h-32 resize-y"
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          {...register("description", {
            required: "Description is required.",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters.",
            },
            onChange: (e) => setDescLength(e.target.value.length),
          })}
        />
        <span className="text-xs text-muted-foreground ml-auto block text-right">
          {descLength} chars
        </span>
      </FormField>

      <ControlledSelect
        name="status"
        control={control}
        label="Status"
        placeholder="Select status"
        options={STATUSES}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Job"}
      </Button>
    </form>
  );
}
