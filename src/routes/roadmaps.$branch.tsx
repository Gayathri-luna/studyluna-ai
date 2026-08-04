import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { branchBySlug, type Branch } from "@/data/branches";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/roadmaps/$branch")({
  loader: ({ params }): { branch: Branch } => {
    const branch = branchBySlug(params.branch);
    if (!branch) throw notFound();
    return { branch };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Roadmap not found | LUNA" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.branch.name} Roadmap | LUNA`;
    const description = `${loaderData.branch.tagline} A complete step-by-step ${loaderData.branch.short} learning roadmap from foundations to job ready.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">Roadmap not found</h1>
      <Link to="/roadmaps" className="mt-4 inline-block text-primary hover:underline">
        Back to all branches
      </Link>
    </div>
  ),
  component: BranchRoadmapPage,
});

function BranchRoadmapPage() {
  const { branch } = Route.useLoaderData() as { branch: Branch };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Link to="/roadmaps" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All branches
      </Link>

      <header className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{branch.short}</p>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-foreground">{branch.name}</h1>
        <p className="mt-3 text-muted-foreground">{branch.tagline}</p>
      </header>

      <section className="mt-10 space-y-4">
        {branch.phases.map((phase, index) => (
          <Card key={phase.title} className="border-border/70 bg-card/50 backdrop-blur-xl">
            <CardHeader className="flex-row items-center gap-3 space-y-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                {index + 1}
              </span>
              <CardTitle className="text-lg">{phase.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {phase.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold text-foreground">Core skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {branch.coreSkills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Careers this unlocks</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {branch.careers.map((career) => (
              <li key={career}>• {career}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Project ideas</h2>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
          {branch.projectIdeas.map((idea) => (
            <li key={idea} className="rounded-xl border border-border/70 bg-card/50 p-4">
              {idea}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 rounded-2xl border border-border/70 bg-card/50 p-8 text-center backdrop-blur-xl">
        <h2 className="text-xl font-bold text-foreground">Want this tailored to you?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Tell Luna AI your semester and available hours, and get a week-by-week plan.
        </p>
        <Link
          to="/luna-ai"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          <Sparkles className="h-4 w-4" /> Ask Luna AI
        </Link>
      </div>
    </div>
  );
}
