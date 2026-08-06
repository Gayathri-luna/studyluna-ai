import { createFileRoute, Link } from "@tanstack/react-router";
import { technicalSkillList, softSkillList } from "@/data/skills";
import { ArrowRight } from "lucide-react";
import { BranchContentPanel } from "@/components/BranchContentPanel";

const DESCRIPTION =
  "Technical skills and soft skills for engineering students — each with its own focused guide, steps and free resources.";

export const Route = createFileRoute("/skills/")({
  head: () => ({
    meta: [
      { title: "Technical & Soft Skills | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Technical & Soft Skills — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

function SkillGrid({ items }: { items: typeof technicalSkillList }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((skill) => (
        <Link
          key={skill.slug}
          to="/skills/$slug"
          params={{ slug: skill.slug }}
          className="group rounded-xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 active:scale-[0.98]"
        >
          <h3 className="text-base font-bold text-foreground">{skill.name}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{skill.summary}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
            Open guide <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}

function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Skills</h1>
        <p className="mt-3 text-muted-foreground">
          Two things get you hired: what you can build, and how well you can explain it.
        </p>
      </header>

      <section className="mt-14" aria-labelledby="technical">
        <h2 id="technical" className="text-2xl font-bold tracking-tight text-foreground">
          Technical Skills
        </h2>
        <SkillGrid items={technicalSkillList} />
      </section>

      <section className="mt-16" aria-labelledby="soft">
        <h2 id="soft" className="text-2xl font-bold tracking-tight text-foreground">
          Soft Skills
        </h2>
        <SkillGrid items={softSkillList} />
      </section>
    </div>
  );
}
