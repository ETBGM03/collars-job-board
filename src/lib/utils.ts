import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPay(min?: number, max?: number): string {
  if (!min && !max) return "Pay not specified";
  if (min && max) return `$${min}–$${max}/hr`;
  if (min) return `From $${min}/hr`;
  return `Up to $${max}/hr`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}