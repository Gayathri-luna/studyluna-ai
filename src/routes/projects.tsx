import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Luna.io" },
      {
        name: "description",
        content:
          "Browse hands-on ECE projects and practical build guides on Luna.io.",
      },
      { property: "og:title", content: "Projects — Luna.io" },
      {
        property: "og:description",
        content:
          "Browse hands-on ECE projects and practical build guides on Luna.io.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="Projects" />,
});
