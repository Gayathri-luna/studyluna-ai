import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { branches, branchBySlug } from "@/data/branches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Settings2, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DESCRIPTION =
  "Your LUNA dashboard — set your engineering branch, study year, career goal and learning speed so every roadmap, project and update is personalised.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard & Settings | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Dashboard & Settings — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

export const YEARS = ["1st year", "2nd year", "3rd year", "Final year", "Graduated", "Working professional"];
export const SPEEDS = ["Relaxed (3-5 hrs/week)", "Steady (6-10 hrs/week)", "Fast (11-20 hrs/week)", "Intense (20+ hrs/week)"];

function DashboardPage() {
  const { user, branch, year, careerGoal, learningSpeed, updateProfile } = useAuth();
  const [goal, setGoal] = useState(careerGoal ?? "");
  const current = branchBySlug(branch);

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Settings2 className="h-3.5 w-3.5 text-primary" /> Personalisation
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Your Dashboard</h1>
        <p className="mt-3 text-muted-foreground">
          {user ? user.email : "You are browsing as a guest — sign in to sync this across devices."} Everything on LUNA
          adapts to what you set here.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" /> Study profile
            </CardTitle>
            <CardDescription>Change these any time — content updates instantly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Engineering branch</Label>
              <Select value={current?.slug ?? ""} onValueChange={(v) => updateProfile({ branch: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((b) => (
                    <SelectItem key={b.slug} value={b.slug}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Current year</Label>
                <Select value={year ?? ""} onValueChange={(v) => updateProfile({ year: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Learning speed</Label>
                <Select value={learningSpeed ?? ""} onValueChange={(v) => updateProfile({ learningSpeed: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pace" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPEEDS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Career goal</Label>
              <div className="flex gap-2">
                <Input
                  id="goal"
                  value={goal}
                  maxLength={120}
                  placeholder="e.g. Embedded firmware engineer at an automotive company"
                  onChange={(e) => setGoal(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => {
                    updateProfile({ careerGoal: goal.trim() || null });
                    toast.success("Career goal saved");
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-4 w-4 text-primary" /> Personalised for you
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{current?.name ?? "No branch selected"}</Badge>
                {year && <Badge variant="outline">{year}</Badge>}
                {learningSpeed && <Badge variant="outline">{learningSpeed}</Badge>}
              </div>
              {careerGoal && <p className="text-muted-foreground">Goal: {careerGoal}</p>}
              {current && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {current.coreSkills.map((s) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-4 w-4 text-primary" /> Jump back in
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              <Link to="/learning-hub" className="text-primary hover:underline">
                Learning Hub →
              </Link>
              <Link to="/projects" className="text-primary hover:underline">
                Projects for my branch →
              </Link>
              <Link to="/career-hub" className="text-primary hover:underline">
                Career updates →
              </Link>
              <Link to="/luna-ai" className="text-primary hover:underline">
                Ask Luna AI →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
