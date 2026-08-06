import { Link, createFileRoute } from "@tanstack/react-router";
import { miniProjects } from "@/data/ece";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { branchBySlug } from "@/data/branches";
import { BranchContentPanel } from "@/components/BranchContentPanel";

const DESCRIPTION =
  "ECE mini projects with objectives, component lists, and step-by-step procedures across IoT, VLSI, RF, DSP, embedded, and edge AI.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "ECE Mini Projects with Procedures | Luna.io" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "ECE Mini Projects with Procedures" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

const levelVariant: Record<string, "secondary" | "default" | "destructive"> = {
  Beginner: "secondary",
  Intermediate: "default",
  Advanced: "destructive",
};

function ProjectsPage() {
  const { branch } = useAuth();
  const info = branchBySlug(branch);
  const showEce = !info || info.slug === "ece";

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Buildable {info?.short ?? "engineering"} projects with clear objectives, component
          lists, and ordered procedures you can follow end to end.
        </p>
        <Link
          to="/luna-ai"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Sparkles className="h-4 w-4" />
          Ask Luna AI to debug or extend a project
        </Link>
      </header>

      <BranchContentPanel section="projects" heading="Your branch project library" />

      {showEce && (
      <div className="mt-14 space-y-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">ECE hardware project library</h2>
        {miniProjects.map((project) => (
          <Card key={project.slug} id={project.slug}>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{project.domain}</Badge>
                <Badge variant={levelVariant[project.level] ?? "secondary"}>
                  {project.level}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {project.duration}
                </span>
              </div>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription>{project.objective}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-[1fr_1.6fr]">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Components
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {project.components.map((component) => (
                    <li key={component} className="flex gap-2">
                      <span aria-hidden className="text-primary">
                        •
                      </span>
                      {component}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Procedure
                </h3>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {project.procedure.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm">
                  <span className="font-semibold text-foreground">
                    Outcome:{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {project.outcome}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      )}
    </div>
  );
}
