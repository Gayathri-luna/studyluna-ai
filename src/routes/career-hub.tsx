import { Link, createFileRoute } from "@tanstack/react-router";
import { careerUpdates, nonTechnicalSkills, roadmaps, technicalSkills } from "@/data/ece";
import { engineeringBranches } from "@/data/engineering-branches";
import { dailyCareerUpdates } from "@/data/daily-career-updates";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness, Sparkles, ArrowRight, ExternalLink, RefreshCw } from "lucide-react";

const DESCRIPTION = "Career roadmaps, skills and opportunities for students across every engineering branch.";

export const Route = createFileRoute("/career-hub")({
  head: () => ({ meta: [{ title: "Career Hub — Every Engineering Branch | Luna.ai" }, { name: "description", content: DESCRIPTION }] }),
  component: CareerHubPage,
});

function CareerHubPage() {
  const liveUpdates = dailyCareerUpdates.length ? dailyCareerUpdates : careerUpdates.map((update) => ({ ...update, link: "" }));

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="container mx-auto">
        <header className="animate-fade-up mx-auto max-w-4xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"><BriefcaseBusiness className="h-3.5 w-3.5" /> Career Hub</div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gradient-circuit sm:text-6xl">Your Career. Your Branch. Your Path.</h1>
          <p className="mt-5 text-lg text-muted-foreground">Explore roadmaps and career options across engineering — CSE, ECE, EEE, Mechanical, Civil, AI, Data Science, Robotics, VLSI, Embedded and more.</p>
          <Link to="/luna-ai" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"><Sparkles className="h-4 w-4" /> Ask Luna AI for my roadmap</Link>
        </header>

        <section className="mt-16" aria-labelledby="branches">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><h2 id="branches" className="text-3xl font-bold">Explore every engineering branch</h2><p className="mt-2 text-muted-foreground">Pick a branch to see relevant career directions and skills.</p></div><span className="text-sm font-medium text-primary">{engineeringBranches.length} branches available</span></div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {engineeringBranches.map((branch, index) => (
              <Card key={branch.short} className={`glass-card animate-fade-up group transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 animation-delay-${Math.min(index * 100, 1000)}`}>
                <CardHeader><div className="flex items-center justify-between"><Badge variant="secondary">{branch.short}</Badge><ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" /></div><CardTitle className="pt-2 text-lg">{branch.name}</CardTitle></CardHeader>
                <CardContent><p className="text-xs font-semibold uppercase tracking-wider text-primary">Career paths</p><ul className="mt-2 space-y-1 text-sm text-muted-foreground">{branch.careers.map((career) => <li key={career}>• {career}</li>)}</ul><div className="mt-4 flex flex-wrap gap-1.5">{branch.skills.map((skill) => <Badge key={skill} variant="outline" className="text-[10px]">{skill}</Badge>)}</div></CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-20" aria-labelledby="roadmaps"><h2 id="roadmaps" className="text-2xl font-bold">Detailed career roadmaps</h2><p className="mt-2 text-muted-foreground">Deep-dive tracks are available now, with the branch library expanding over time.</p><div className="mt-8 grid gap-6 lg:grid-cols-2">{roadmaps.map((roadmap) => <Card key={roadmap.slug} className="glass-card transition-all hover:-translate-y-1"><CardHeader><CardTitle>{roadmap.title}</CardTitle><CardDescription>{roadmap.summary}</CardDescription><p className="pt-1 text-sm font-medium text-primary">{roadmap.salary}</p></CardHeader><CardContent className="flex flex-col"><Accordion type="single" collapsible className="w-full">{roadmap.stages.map((stage) => <AccordionItem key={stage.stage} value={stage.stage}><AccordionTrigger className="text-left text-sm font-semibold">{stage.stage}</AccordionTrigger><AccordionContent><ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">{stage.items.map((item) => <li key={item}>{item}</li>)}</ul></AccordionContent></AccordionItem>)}</Accordion><div className="mt-4 flex flex-wrap gap-2">{roadmap.tools.map((tool) => <Badge key={tool} variant="secondary">{tool}</Badge>)}</div></CardContent></Card>)}</div></section>

        <section className="mt-20" aria-labelledby="technical-skills"><h2 id="technical-skills" className="text-2xl font-bold">Technical skills</h2><div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{technicalSkills.map((group) => <Card key={group.group} className="glass-card"><CardHeader><CardTitle className="text-lg">{group.group}</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm text-muted-foreground">{group.skills.map((skill) => <li key={skill}>• {skill}</li>)}</ul></CardContent></Card>)}</div></section>

        <section className="mt-20" aria-labelledby="soft-skills"><h2 id="soft-skills" className="text-2xl font-bold">Non-technical skills</h2><div className="mt-6 grid gap-6 sm:grid-cols-2">{nonTechnicalSkills.map((skill) => <Card key={skill.title} className="glass-card"><CardHeader><CardTitle className="text-lg">{skill.title}</CardTitle><CardDescription>{skill.detail}</CardDescription></CardHeader></Card>)}</div></section>

        <section className="mt-20" aria-labelledby="career-updates">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><h2 id="career-updates" className="text-2xl font-bold">Daily career & industry updates</h2><p className="mt-2 text-muted-foreground">Fresh engineering, technology and hiring news is refreshed automatically every day.</p></div><span className="inline-flex items-center gap-2 text-xs font-medium text-primary"><RefreshCw className="h-3.5 w-3.5" /> Auto-updated daily</span></div>
          <div className="mt-6 space-y-4">{liveUpdates.map((update) => <Card key={`${update.title}-${update.period}`} className="glass-card transition-all hover:-translate-y-1"><CardHeader><div className="flex flex-wrap items-center gap-2"><Badge>{update.category}</Badge><span className="text-xs text-muted-foreground">{update.period}</span></div><CardTitle className="text-lg">{update.title}</CardTitle><CardDescription>{update.detail}</CardDescription>{update.link && <a href={update.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">Read source <ExternalLink className="h-3 w-3" /></a>}</CardHeader></Card>)}</div>
        </section>

        <section className="glass-card mt-20 rounded-3xl p-8 text-center"><h2 className="text-2xl font-bold">Not sure which branch or career fits you?</h2><p className="mx-auto mt-3 max-w-xl text-muted-foreground">Tell Luna AI your interests, semester and goals. It can help you compare paths and create a practical learning plan.</p><Link to="/luna-ai" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-1"><Sparkles className="h-4 w-4" /> Open Luna AI</Link></section>
      </div>
    </div>
  );
}
