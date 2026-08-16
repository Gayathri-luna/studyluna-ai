import { Link } from "@tanstack/react-router";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">LUNA</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              One Platform. Endless Learning.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Empowering the Future of Electronics Engineers.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/platform" className="hover:text-foreground">
                  Platform
                </Link>
              </li>
              <li>
                <Link to="/hub" className="hover:text-foreground">
                  Career Hub
                </Link>
              </li>

              <li>
                <Link to="/hub" className="hover:text-foreground">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/luna-ai" className="hover:text-foreground">
                  LunaAI 7.0
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/industry-news" className="hover:text-foreground">
                  Industry News
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-foreground">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy-policy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} LUNA. All Rights Reserved.
          </p>

          <p className="text-sm text-muted-foreground">
            Built with ❤️ by Gayathri Marasani
          </p>
        </div>
      </div>
    </footer>
  );
}
