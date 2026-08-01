import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/career-hub")({
  head: () => ({
    meta: [
      { title: "Career Hub — Luna.io" },
      {
        name: "description",
        content:
          "Explore ECE career roadmaps, skill guides, and opportunities on Luna.io.",
      },
      { property: "og:title", content: "Career Hub — Luna.io" },
      {
        property: "og:description",
        content:
          "Explore ECE career roadmaps, skill guides, and opportunities on Luna.io.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="Career Hub" />,
});
