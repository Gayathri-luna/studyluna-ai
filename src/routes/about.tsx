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
  Twitter,
  Unlock,
  Users,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Luna.io" },
      {
        name: "description",
        content:
          "Learn about Luna.io's mission, vision, core values, and the creator behind the AI-powered ECE learning platform.",
      },
      { property: "og:title", content: "About Luna.io" },
      {
        property: "og:description",
        content:
          "Our mission is to make Electronics & Communication Engineering accessible, practical, and career-focused.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Learn by Building",
    description: "Turn theory into real-world projects and hands-on experience.",
    icon: Wrench,
  },
  {
    title: "Practical Knowledge",
    description: "Focus on skills that engineers actually use in the industry.",
    icon: BookOpen,
  },
  {
    title: "Innovation",
    description: "Encourage curiosity, experimentation, and new ideas.",
    icon: Lightbulb,
  },
  {
    title: "Open Learning",
    description: "Make quality ECE education accessible to everyone, everywhere.",
    icon: Unlock,
  },
  {
    title: "Community First",
    description: "Learn together, share knowledge, and grow as a network.",
    icon: Users,
  },
  {
    title: "Lifelong Learning",
    description: "Stay curious and keep evolving with the fast-moving tech landscape.",
    icon: GraduationCap,
  },
  {
    title: "Engineering Excellence",
    description: "Aim for high standards in every design, build, and solution.",
    icon: Award,
  },
];

const skills = [
  "Electronics & Communication",
  "Full-Stack Development",
  "AI Integration",
  "E-Learning Design",
  "Career Mentorship",
  "Community Building",
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/gayathri", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/gayathri", icon: Linkedin },
  { label: "X", href: "https://x.com/gayathri", icon: Twitter },
  { label: "Email", href: "mailto:gayathri@luna.io", icon: Mail },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border bg-muted/30 py-20 sm:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            About Luna.io
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Empowering the next generation of Electronics & Communication
            Engineers with AI-driven learning and career support.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        <section className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              <Cpu className="h-4 w-4" />
              Our Mission
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Luna.io is an AI-powered platform built to make Electronics &
              Communication Engineering accessible, practical, and career-focused.
              The goal is to help learners confidently navigate ECE by providing
              structured learning paths, career roadmaps, project guidance, AI
              mentorship, industry updates, and a collaborative community.
            </p>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              <Lightbulb className="h-4 w-4" />
              Our Vision
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              To become the world&apos;s most trusted AI-powered platform for
              Electronics & Communication Engineering, empowering learners,
              professionals, and innovators with the knowledge and tools they need
              to succeed.
            </p>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
            Core Values
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/20 hover:bg-accent"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
            Meet the Creator
          </h2>
          <div className="mt-10 mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-8 p-8 md:flex-row md:items-start">
              <div className="flex flex-shrink-0 justify-center md:justify-start">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
                  G
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    M. Gayathri
                  </h3>
                  <p className="text-sm font-medium text-primary">
                    Founder & Developer of Luna.io
                  </p>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  &ldquo;I created Luna.io to solve a problem faced by many ECE
                  learners—knowing what to learn, where to start, and how to build a
                  successful career. My vision is to create a platform where anyone
                  interested in Electronics & Communication Engineering can find
                  structured learning paths, practical projects, career guidance,
                  AI-powered mentorship, and the latest industry insights, all in one
                  place.&rdquo;
                </blockquote>

                <div>
                  <h4 className="text-sm font-semibold text-card-foreground">
                    Personal Mission
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    To make ECE education accessible, practical, and career-focused
                    for learners around the world.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-card-foreground">
                    Skills & Interests
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-card-foreground">
                    Contact
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Email:{" "}
                    <a
                      href="mailto:gayathri@luna.io"
                      className="font-medium text-primary hover:underline"
                    >
                      gayathri@luna.io
                    </a>
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      <link.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
