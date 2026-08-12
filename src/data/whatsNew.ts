/**
 * "What's New" feed — data driven, hand-curated.
 *
 * Every entry is a real, verifiable item on LUNA or a real external resource.
 * Add entries here; the UI renders them automatically. No auto-generated news.
 */

export type UpdateKind = "resource" | "opportunity" | "career" | "project" | "technology" | "platform";

export interface PlatformUpdate {
  id: string;
  kind: UpdateKind;
  title: string;
  summary: string;
  /** ISO date this entry was added to LUNA. */
  date: string;
  /** Internal route or external URL. */
  href: string;
}

export const UPDATE_KIND_LABEL: Record<UpdateKind, string> = {
  resource: "New resource",
  opportunity: "Opportunity",
  career: "Career update",
  project: "New project",
  technology: "Technology",
  platform: "Student update",
};

export const platformUpdates: PlatformUpdate[] = [
  {
    id: "personal-plan",
    kind: "platform",
    title: "Personal Learning Plan is live",
    summary:
      "Create your own goal, pick a study schedule and an optional reminder time, and track it as not started, in progress or completed.",
    date: "2026-08-12",
    href: "/my-plan",
  },
  {
    id: "branch-career-updates",
    kind: "career",
    title: "Branch-wise career updates",
    summary:
      "Priority hiring domains and the exact skills each expects, filtered to the branch you selected.",
    date: "2026-07-28",
    href: "/industry-news",
  },
  {
    id: "luna-ai-7",
    kind: "technology",
    title: "LunaAI 7.0 multimodal assistant",
    summary:
      "Threads, study modes, image and audio understanding, and a model selector from Lite to Research.",
    date: "2026-07-20",
    href: "/luna-ai",
  },
  {
    id: "branch-roadmaps-18",
    kind: "resource",
    title: "Roadmaps for 18 engineering branches",
    summary:
      "Subjects, tools, projects and career paths now change with the branch you choose, from ECE to Petroleum.",
    date: "2026-07-14",
    href: "/roadmaps",
  },
  {
    id: "mini-projects",
    kind: "project",
    title: "Mini projects with full procedures",
    summary: "Beginner to advanced builds, each with components, steps and what you learn from it.",
    date: "2026-07-02",
    href: "/projects",
  },
  {
    id: "gov-jobs",
    kind: "opportunity",
    title: "Government and PSU route guides",
    summary: "ISRO, DRDO, GATE, BEL and more — eligibility, exam pattern, preparation and pay band.",
    date: "2026-06-24",
    href: "/government-jobs",
  },
];
