import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin, MessageSquare, Sparkles } from "lucide-react";

const DESCRIPTION = "Contact the Luna.ai team for feedback, collaboration and support.";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Luna.ai" }, { name: "description", content: DESCRIPTION }] }),
  component: ContactPage,
});

const LINKS = [
  { icon: Mail, label: "Co-Founder Email", value: "varshiniyarramsetty03@gmail.com", href: "mailto:varshiniyarramsetty03@gmail.com" },
  { icon: Github, label: "GitHub", value: "Gayathri-luna", href: "https://github.com/Gayathri-luna" },
  { icon: Linkedin, label: "Founder LinkedIn", value: "Gayathri Marasani", href: "https://www.linkedin.com/in/gayathri-marasani" },
];

function ContactPage() {
  return (
    <div className="circuit-grid min-h-screen px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <header className="animate-fade-up text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"><Sparkles className="h-3.5 w-3.5" /> Let's connect</div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">Contact Luna.ai</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Have feedback, a collaboration idea, or a bug to report? Reach the team directly.</p>
        </header>

        <div className="glass-card animate-fade-up mt-12 rounded-3xl p-8 animation-delay-200">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-primary">Founder</p>
              <h2 className="mt-1 text-2xl font-bold">Gayathri Marasani</h2>
              <p className="mt-1 text-sm text-muted-foreground">Founder & Developer of Luna.ai</p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">Luna.ai is designed for engineering learners across every branch, with learning paths, projects, AI guidance and career discovery.</p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-[11px] font-medium uppercase tracking-wider text-primary">Co-Founder</p>
              <h3 className="mt-1 text-xl font-bold">Varshini Yarramsetty</h3>
              <p className="mt-1 text-sm text-muted-foreground">Co-Founder & Partner</p>
              <a href="mailto:varshiniyarramsetty03@gmail.com" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"><Mail className="h-4 w-4" /> varshiniyarramsetty03@gmail.com</a>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group rounded-2xl border border-border/70 bg-background/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10">
                <link.icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="mt-3 block text-xs uppercase tracking-wider text-muted-foreground">{link.label}</span>
                <span className="mt-1 block break-words text-sm font-medium">{link.value}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="glass-card animate-fade-up mt-6 flex items-start gap-3 rounded-2xl p-6 animation-delay-400">
          <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">For quick questions about learning paths, skills, projects or careers, Luna AI can help before you contact the team.</p>
        </div>
      </div>
    </div>
  );
}
