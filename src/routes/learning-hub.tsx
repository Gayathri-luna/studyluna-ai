import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/learning-hub")({
  head: () => ({
    meta: [
      { title: "Learning Hub — Luna.io" },
      {
        name: "description",
        content:
          "Discover structured learning paths for Electronics & Communication Engineering on Luna.io.",
      },
      { property: "og:title", content: "Learning Hub — Luna.io" },
      {
        property: "og:description",
        content:
          "Discover structured learning paths for Electronics & Communication Engineering on Luna.io.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="Learning Hub" />,
});
