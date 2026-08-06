import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2, RefreshCw, Sparkles, ExternalLink, Lightbulb } from "lucide-react";
import { getBranchContent, type BranchContent, type BranchSection } from "@/lib/branch-content.functions";
import { branchBySlug } from "@/data/branches";
import { useAuth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function BranchContentPanel({
  section,
  heading,
  topic,
}: {
  section: BranchSection;
  heading: string;
  topic?: string;
}) {
  const { branch, year, careerGoal, learningSpeed } = useAuth();
  const run = useServerFn(getBranchContent);
  const branchInfo = branchBySlug(branch);

  const { mutate, data, isPending, error } = useMutation<BranchContent>({
    mutationFn: () =>
      run({
        data: {
          branch: branchInfo?.name ?? "Engineering",
          section,
          year: year ?? null,
          careerGoal: careerGoal ?? null,
          learningSpeed: learningSpeed ?? null,
          topic: topic ?? null,
        },
      }),
  });

  useEffect(() => {
    if (branchInfo) mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchInfo?.slug, section, topic, year, careerGoal, learningSpeed]);

  if (!branchInfo) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Pick your branch to personalise this page</CardTitle>
          <CardDescription>
            LUNA tailors {heading.toLowerCase()} to your engineering branch, year and career goal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to="/dashboard">Choose my branch</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{heading}</h2>
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="h-3 w-3" /> {branchInfo.short}
        </Badge>
        {year && <Badge variant="outline">{year}</Badge>}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => mutate()}
          disabled={isPending}
        >
          <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      {isPending && (
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-border/70 bg-card/50 p-6 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Luna AI is personalising this for {branchInfo.name}…
        </div>
      )}

      {error && !isPending && (
        <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-sm text-muted-foreground">
          {(error as Error).message}{" "}
          <button type="button" className="text-primary underline-offset-4 hover:underline" onClick={() => mutate()}>
            Try again
          </button>
        </div>
      )}

      {data && !isPending && (
        <div className="mt-6 space-y-6">
          <p className="text-muted-foreground">{data.intro}</p>

          {data.recommendation && (
            <div className="flex gap-3 rounded-xl border border-primary/40 bg-primary/5 p-4 text-sm">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-foreground">{data.recommendation}</p>
            </div>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            {data.groups.map((group) => (
              <Card key={group.title} className="backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-lg">{group.title}</CardTitle>
                  {group.subtitle && <CardDescription>{group.subtitle}</CardDescription>}
                  {group.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {group.badges.map((b) => (
                        <Badge key={b} variant="outline" className="text-[11px]">
                          {b}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {group.items.map((item, i) => (
                      <AccordionItem key={`${item.title}-${i}`} value={`${group.title}-${i}`}>
                        <AccordionTrigger className="text-left text-sm font-semibold">{item.title}</AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                          {item.bullets.length > 0 && (
                            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                              {item.bullets.map((b, bi) => (
                                <li key={bi}>{b}</li>
                              ))}
                            </ul>
                          )}
                          {item.links.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {item.links.map((link, li) => (
                                <a
                                  key={li}
                                  href={link.href}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="inline-flex items-center gap-1 rounded-full border border-border/70 px-2.5 py-1 text-xs text-primary transition-colors hover:bg-accent/60"
                                >
                                  {link.label} <ExternalLink className="h-3 w-3" />
                                </a>
                              ))}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
