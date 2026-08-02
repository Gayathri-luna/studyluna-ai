import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luna.io — Empowering Electronics Engineers" },
      {
        name: "description",
        content:
          "Luna.io is an AI-powered platform for Electronics & Communication Engineering learners, offering structured paths, projects, career guidance, and community.",
      },
      {
        property: "og:title",
        content: "Luna.io — Empowering Electronics Engineers",
      },
      {
        property: "og:description",
        content:
          "Luna.io is an AI-powered platform for Electronics & Communication Engineering learners, offering structured paths, projects, career guidance, and community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Zap className="h-3.5 w-3.5" />
            AI-powered ECE platform
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gradient-circuit sm:text-6xl">
            Luna.io
          </h1>
          <p className="mt-6 text-xl font-medium text-foreground">
            Empowering the Future of Electronics Engineers.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Structured learning paths, practical circuits and projects, career
            roadmaps, AI mentorship, and a community built for ECE learners.
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
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
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

