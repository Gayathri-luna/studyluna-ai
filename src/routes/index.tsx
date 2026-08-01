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
          "Structured learning paths, career roadmaps, project guidance, AI mentorship, and community for ECE learners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
        Luna.io
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        Empowering the Future of Electronics Engineers.
      </p>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        Discover structured learning paths, practical projects, career roadmaps,
        AI mentorship, and a collaborative community built for ECE learners.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/about"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          About Luna.io
        </Link>
        <Link
          to="/learning-hub"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
        >
          Start Learning
        </Link>
      </div>
    </section>
  );
}
