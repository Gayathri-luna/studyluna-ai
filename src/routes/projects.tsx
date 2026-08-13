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

const DESCRIPTION =
  "Branch-wise engineering mini and major project ideas, plus detailed build guides with objectives, components and step-by-step procedures.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Engineering Mini Projects with Procedures | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Engineering Mini Projects with Procedures" },
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
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Mini Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Project ideas for your branch, plus detailed build guides with clear
          objectives, component lists and ordered procedures.
        </p>
        <Link
          to="/luna-ai"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Sparkles className="h-4 w-4" />
          Ask Luna AI to debug or extend a project
        </Link>
      </header>

      <div className="mt-14 space-y-8">
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
    </div>
  );
}
