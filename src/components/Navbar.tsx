import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import lunaLogo from "@/assets/luna-logo.png";

const NAV_LINKS = [
  { to: "/platform", label: "Platform" },
  { to: "/learning-hub", label: "Learning Hub" },
  { to: "/career-hub", label: "Career Hub" },
  { to: "/projects", label: "Projects" },
  { to: "/industry-news", label: "News" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="container mx-auto flex items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={lunaLogo}
            alt="LUNA logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-foreground">
              LUNA
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:block">
              One Platform. Endless Learning.
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-foreground bg-accent/60" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/luna-ai"
            className="ml-2 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Ask Luna AI
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 lg:hidden">
          <div className="container mx-auto flex flex-col px-4 py-2">
            {[...NAV_LINKS, { to: "/luna-ai", label: "Luna AI" } as const].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
