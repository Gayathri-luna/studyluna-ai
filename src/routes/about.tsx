import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Cpu,
  Github,
  GraduationCap,
  Lightbulb,
  Linkedin,
  Mail,
  Sparkles,
  Unlock,
  Users,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Luna.ai — Engineering for Everyone" },
      {
        name: "description",
        content:
          "Luna.ai is an AI-powered learning and career platform for students across engineering branches.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { title: "Learn by Building", description: "Turn theory into practical projects and hands-on experience.", icon: Wrench },
  { title: "Practical Knowledge", description: "Focus on skills engineers use in real-world teams.", icon: BookOpen },
  { title: "Innovation", description: "Experiment, explore and turn ideas into useful solutions.", icon: Lightbulb },
  { title: "Open Learning", description: "Make quality engineering learning accessible to everyone.", icon: Unlock },
  { title: "Community First", description: "Learn together, share knowledge and grow as a network.", icon: Users },
  { title: "Lifelong Learning", description: "Keep evolving with technology and changing careers.", icon: GraduationCap },
  { title: "Engineering Excellence", description: "Aim for strong fundamentals, thoughtful design and reliable solutions.", icon: Award },
];

const skills = [
  "Engineering Education",
  "Full-Stack Development",
  "AI Integration",
  "E-Learning Design",
  "Career Guidance",
  "Community Building",
];

const socialLinks = [
  { label: "GitHub — Gayathri-luna", href: "https://github.com/Gayathri-luna", icon: Github },
  { label: "LinkedIn — Gayathri Marasani", href: "https://www.linkedin.com/in/gayathri-marasani", icon: Linkedin },
  { label: "Email — varshiniyarramsetty03@gmail.com", href: "mailto:varshiniyarramsetty03@gmail.com", icon: Mail },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="circuit-grid relative overflow-hidden border-b border-border bg-card/40 py-20 sm:py-28">
        <div className="floating-orb left-[10%] top-16" />
        <div className="floating-orb right-[12%] top-28 animation-delay-1000" />
        <div className="absolute -top-24 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="animate-fade-up mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Engineering · AI · Careers
          </div>
          <h1 className="animate-fade-up text-4xl font-extrabold tracking-tight text-gradient-circuit sm:text-6xl">
            About Luna.ai
          </h1>
          <p className="animate-fade-up mx-auto mt-5 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            One AI-powered learning and career platform for students across every engineering branch — not just ECE.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="glass-card animate-fade-up rounded-3xl p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium">
              <Cpu className="h-4 w-4" /> Our Mission
            </div>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Luna.ai helps engineering learners discover what to learn, build practical projects, develop technical and non-technical skills, explore careers, and use AI guidance — whatever their branch or starting point.
            </p>
          </div>
          <div className="glass-card animate-fade-up rounded-3xl p-8 animation-delay-200">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium">
              <Lightbulb className="h-4 w-4" /> Our Vision
            </div>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              To become a trusted AI-powered learning and career companion for engineering students, professionals and innovators across every branch.
            </p>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight">Core Values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div key={value.title} className={`glass-card animate-fade-up group rounded-2xl p-6 animation-delay-${Math.min(index * 100, 1000)}`}>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight">Meet the Team</h2>
          <div className="glass-card mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl">
            <div className="grid gap-8 p-8 md:grid-cols-[auto_1fr]">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground shadow-lg shadow-primary/20">G</div>
              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl font-semibold">Gayathri Marasani</h3>
                  <p className="text-sm font-medium text-primary">Founder & Developer of Luna.ai</p>
                </div>
                <p className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  Luna.ai is built to remove the confusion around learning, projects and careers — giving engineering students one place to explore, build and grow.
                </p>
                <div>
                  <h4 className="text-sm font-semibold">Skills & Interests</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill) => <span key={skill} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{skill}</span>)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  {socialLinks.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary">
                      <link.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border p-8">
              <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-3xl font-bold">V</div>
                <div>
                  <h3 className="text-xl font-semibold">Varshini Yarramsetty</h3>
                  <p className="text-sm font-medium text-primary">Co-Founder & Partner</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Working with the founder on content, learning experience, community growth and the wider engineering vision of Luna.ai.</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <a href="mailto:varshiniyarramsetty03@gmail.com" className="inline-flex items-center gap-2 text-primary hover:underline"><Mail className="h-4 w-4" /> varshiniyarramsetty03@gmail.com</a>
                    <a href="https://github.com/Gayathri-luna" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline"><Github className="h-4 w-4" /> GitHub</a>
                    <a href="https://www.linkedin.com/in/varshini-yarramsetty" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline"><Linkedin className="h-4 w-4" /> LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
