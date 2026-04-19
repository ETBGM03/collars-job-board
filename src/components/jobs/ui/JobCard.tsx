import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate, formatPay } from "@/lib/utils";
import type { Job } from "@/types/job";
import { MapPin, Briefcase, Calendar } from "lucide-react";

const statusStyles: Record<Job["status"], string> = {
  Active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Draft: "bg-amber-100 text-amber-800 border-amber-200",
  Closed: "bg-gray-100 text-gray-600 border-gray-200",
};

const jobTypeStyles: Record<Job["jobType"], string> = {
  "Full-time": "bg-blue-100 text-blue-800 border-blue-200",
  "Part-time": "bg-purple-100 text-purple-800 border-purple-200",
  Contract: "bg-orange-100 text-orange-800 border-orange-200",
};

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="group hover:shadow-md w-full h-full flex flex-col transition-all duration-200 border border-border/60 hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-tight truncate group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5 font-medium">
              {job.trade}
            </p>
          </div>
          <Badge
            className={`shrink-0 text-xs border ${statusStyles[job.status]}`}
          >
            {job.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 shrink-0" />
            <Badge
              className={`text-xs border font-normal ${jobTypeStyles[job.jobType]}`}
            >
              {job.jobType}
            </Badge>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {formatDate(job.createdAt)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        <div className="mt-auto pt-1 border-t border-border/50">
          <span className="text-sm font-semibold text-foreground">
            {formatPay(job.payMin, job.payMax)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
