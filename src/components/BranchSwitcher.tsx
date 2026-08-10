import { branches } from "@/data/branches";
import { useAuth } from "@/lib/auth";
import { Check } from "lucide-react";

interface Props {
  /** Currently displayed branch slug (defaults to the user's saved branch). */
  value?: string | null;
  /** Called when a branch chip is clicked. Defaults to saving it as the user's branch. */
  onSelect?: (slug: string) => void;
  className?: string;
  label?: string;
}

/**
 * Reusable, data-driven branch selector. Renders every branch from
 * src/data/branches.ts, so new branches appear here automatically.
 */
export function BranchSwitcher({ value, onSelect, className, label = "Your branch" }: Props) {
  const { branch, setBranch } = useAuth();
  const active = value ?? branch;
  const choose = onSelect ?? setBranch;

  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {branches.map((b) => {
          const selected = active === b.slug;
          return (
            <button
              key={b.slug}
              type="button"
              onClick={() => choose(b.slug)}
              aria-pressed={selected}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                selected
                  ? "border-primary/70 bg-primary/15 text-primary"
                  : "border-border/70 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {selected && <Check className="h-3 w-3" />}
              {b.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
