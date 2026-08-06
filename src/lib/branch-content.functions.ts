import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

export const BRANCH_SECTIONS = [
  "learning-hub",
  "technical-skills",
  "non-technical-skills",
  "projects",
  "career-updates",
  "resources",
  "roadmap",
] as const;

export type BranchSection = (typeof BRANCH_SECTIONS)[number];

const InputSchema = z.object({
  branch: z.string().min(1),
  section: z.enum(BRANCH_SECTIONS),
  year: z.string().nullable().optional(),
  careerGoal: z.string().nullable().optional(),
  learningSpeed: z.string().nullable().optional(),
  topic: z.string().nullable().optional(),
});

const ContentSchema = z.object({
  intro: z.string(),
  recommendation: z.string().optional().default(""),
  groups: z
    .array(
      z.object({
        title: z.string(),
        subtitle: z.string().optional().default(""),
        badges: z.array(z.string()).optional().default([]),
        items: z
          .array(
            z.object({
              title: z.string(),
              description: z.string().optional().default(""),
              bullets: z.array(z.string()).optional().default([]),
              links: z
                .array(z.object({ label: z.string(), href: z.string() }))
                .optional()
                .default([]),
            }),
          )
          .default([]),
      }),
    )
    .min(1),
});

export type BranchContent = z.infer<typeof ContentSchema>;

const SECTION_PROMPTS: Record<BranchSection, string> = {
  "learning-hub":
    "Build a Learning Hub. Create 4-6 groups — one per core subject/topic of the branch. Inside each group, create exactly 3 items titled 'Beginner', 'Intermediate' and 'Advanced'. Each item's description states what the learner masters at that level, and bullets MUST cover: Videos (name a real free YouTube channel/playlist), Notes, Practice, Assignments, Projects, Quizzes — one bullet each, prefixed with that word. Add real links where possible. In 'recommendation', state which level the learner should start at and why, based on their profile.",
  "technical-skills":
    "List 8-10 technical skills that actually get this branch hired. Each skill is a group; its items are exactly: 'Overview', 'Learning Roadmap', 'Free YouTube Playlist', 'Official Documentation', 'Books', 'Practice Websites', 'GitHub Projects', 'Interview Questions', 'Certifications'. Use bullets for lists and real links (official docs, YouTube, GitHub, practice sites) wherever they exist.",
  "non-technical-skills":
    "Cover these non-technical skills as groups: Communication, Resume Building, LinkedIn, Aptitude, HR Interview, Technical Interview, Group Discussion, Public Speaking, Leadership, Time Management. Each group has items 'Videos', 'Articles', 'Templates', 'Exercises' with real links and concrete bullets, tailored to this branch's placement season.",
  projects:
    "Create a project library. Groups must be: 'Beginner', 'Intermediate', 'Advanced', 'Mini Projects', 'Major Projects', 'Final Year Projects'. Each group has 3-4 project items. Each item's description is the project description; bullets MUST include lines prefixed 'Required skills:', 'Components:', 'Source code:', 'Report:', 'PPT:', 'Video:' (use real GitHub/YouTube search or repo links in the links array).",
  "career-updates":
    "Give current, branch-specific career updates. Groups: 'Hiring & Jobs', 'Internships', 'Government & PSU', 'Exams & Certifications', 'Contests, Hackathons & Events'. Each item: what it is, who is eligible, and the next action. Only include opportunities that genuinely fit this branch.",
  resources:
    "Curate free learning resources for this branch. Groups: 'YouTube Channels', 'Free Courses', 'Books', 'Documentation & Standards', 'Practice Platforms', 'GitHub Repositories', 'Communities'. Every item needs a real working link and a one-line note on why it is worth the time.",
  roadmap:
    "Build a phase-by-phase career roadmap for this branch. Groups are phases from fundamentals to job-ready, each with items for topics, tools and deliverables plus realistic durations in the subtitle.",
};

export const getBranchContent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<BranchContent> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key);

    const profile = [
      `Branch: ${data.branch}`,
      data.year ? `Year: ${data.year}` : null,
      data.careerGoal ? `Career goal: ${data.careerGoal}` : null,
      data.learningSpeed ? `Learning pace: ${data.learningSpeed}` : null,
      data.topic ? `Topic focus: ${data.topic}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const prompt = `You are Luna AI, a mentor for engineering students in India.

Learner profile:
${profile}

Task: ${SECTION_PROMPTS[data.section]}

Rules:
- Everything must be specific to the "${data.branch}" branch. Never give generic advice that would suit any branch.
- Be concrete: real tool names, real course names, real companies, real links.
- No filler, no marketing language. Keep each bullet under 25 words.
- "intro" is a 1-2 sentence framing line for this section.

Respond with ONLY a JSON object (no markdown fences, no commentary) shaped exactly like:
{"intro":string,"recommendation":string,"groups":[{"title":string,"subtitle":string,"badges":[string],"items":[{"title":string,"description":string,"bullets":[string],"links":[{"label":string,"href":string}]}]}]}`;

    const { text } = await generateText({
      model: gateway("google/gemini-3.6-flash"),
      prompt,
    });

    const cleaned = text.trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned.slice(start, end + 1));
    } catch {
      throw new Error("Luna AI returned an unexpected response. Please try again.");
    }

    const result = ContentSchema.safeParse(parsed);
    if (!result.success) {
      throw new Error("Luna AI returned incomplete content. Please try again.");
    }
    return result.data;
  });
