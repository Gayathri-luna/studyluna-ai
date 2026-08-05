import { createFileRoute, Link } from "@tanstack/react-router";
import { govJobs } from "@/data/govJobs";
import { ArrowRight, Landmark } from "lucide-react";

const DESCRIPTION =
  "ISRO, DRDO, BEL, HAL, ECIL, BHEL, Railways, BSNL, GATE and SSC JE — eligibility, salary, exam pattern, roadmap and resources for engineering government jobs.";

export const Route = createFileRoute("/government-jobs/")({
  head: () => ({
    meta: [
      { title: "Engineering Government Jobs — ISRO, DRDO, GATE, PSU | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Engineering Government Jobs — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GovJobsPage,
});

function GovJobsPage() {
  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Landmark className="h-3.5 w-3.5 text-primary" /> Government Careers
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Government Jobs
        </h1>
        <p className="mt-3 text-muted-foreground">
          Pick an organisation to see eligibility, salary, exam pattern and a
          preparation roadmap.
        </p>
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {govJobs.map((job) => (
          <Link
            key={job.slug}
            to="/government-jobs/$slug"
            params={{ slug: job.slug }}
            className="group rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 active:scale-[0.98]"
          >
            <span className="text-[11px] font-medium uppercase tracking-wider text-primary">
              {job.category}
            </span>
            <h2 className="mt-2 flex items-center gap-2 text-lg font-bold text-foreground">
              {job.org}
              <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{job.full}</p>
            <p className="mt-3 text-sm text-muted-foreground">{job.summary}</p>
            <p className="mt-3 text-xs font-medium text-foreground">{job.salary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
