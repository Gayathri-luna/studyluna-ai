import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { UPDATE_KIND_LABEL, platformUpdates } from "@/data/whatsNew";

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export function WhatsNew({ limit }: { limit?: number }) {
  const updates = [...platformUpdates]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit ?? platformUpdates.length);

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> What's new on LUNA
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Recently added
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          New resources, opportunities, projects and career directions — curated, never auto-generated.
        </p>
      </div>

      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {updates.map((update, index) => {
          const external = update.href.startsWith("http");
          const inner = (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-primary/12 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {UPDATE_KIND_LABEL[update.kind]}
                </span>
                <time dateTime={update.date} className="text-[11px] text-muted-foreground">
                  {formatDate(update.date)}
                </time>
              </div>
              <h3 className="mt-3 text-base font-bold text-foreground">{update.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{update.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </>
          );

          const className =
            "group block h-full rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg active:scale-[0.99] animate-rise";

          return (
            <li key={update.id} style={{ animationDelay: `${index * 60}ms` }} className="animate-rise">
              {external ? (
                <a href={update.href} target="_blank" rel="noreferrer" className={className}>
                  {inner}
                </a>
              ) : (
                <Link to={update.href as never} className={className}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
