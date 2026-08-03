import { Link, createFileRoute } from "@tanstack/react-router";
import { CircuitBoard, Cpu, Radio, Sparkles, Zap } from "lucide-react";
import lunaLogo from "@/assets/luna-logo.png";

const TITLE = "LUNA | One Platform. Endless Learning";
const DESCRIPTION =
  "LUNA is an AI-powered learning platform that helps engineering students with roadmaps, AI guidance, projects, skills, career preparation, and learning resources.";
const URL = "https://studywithluna.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: HomePage,
});


const highlights = [
  {
    icon: CircuitBoard,
    title: "Career Roadmaps",
    text: "VLSI, embedded, RF, DSP, IoT and more — staged step by step.",
  },
  {
    icon: Cpu,
    title: "Mini Projects",
    text: "Buildable projects with components and full procedures.",
  },
  {
    icon: Radio,
    title: "Industry Pulse",
    text: "Fresh semiconductor, telecom and automotive career updates.",
  },
  {
    icon: Sparkles,
    title: "Luna AI Mentor",
    text: "Personalized learning plans generated for your target job.",
  },
];

function HomePage() {
  return (
    <div className="bg-background">
      <section className="circuit-grid relative overflow-hidden px-4 py-24 sm:py-32">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <img
            src={lunaLogo}
            alt="LUNA logo"
            width={112}
            height={112}
            className="mx-auto mb-6 h-24 w-24 object-contain drop-shadow-[0_0_28px_var(--color-primary)] sm:h-28 sm:w-28"
          />
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Zap className="h-3.5 w-3.5" />
            AI-powered engineering platform
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gradient-circuit sm:text-7xl">
            LUNA
          </h1>
          <p className="mt-6 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            One Platform. Endless Learning.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Structured learning paths, practical circuits and projects, career
            roadmaps, AI mentorship, and a community built for engineering
            students.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/learning-hub"
              className="glow-primary inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Generate My Roadmap
            </Link>
            <Link
              to="/luna-ai"
              className="inline-flex items-center justify-center rounded-md border border-primary/40 bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Ask Luna AI
            </Link>
            <Link
              to="/platform"
              className="inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Explore the platform →
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[var(--glow-primary)]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-card-foreground">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

