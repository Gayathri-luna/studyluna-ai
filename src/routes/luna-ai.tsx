import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/luna-ai")({
  head: () => ({
    meta: [
      { title: "Luna AI — Luna.io" },
      {
        name: "description",
        content:
          "Get AI-powered mentorship and guidance for Electronics & Communication Engineering.",
      },
      { property: "og:title", content: "Luna AI — Luna.io" },
      {
        property: "og:description",
        content:
          "Get AI-powered mentorship and guidance for Electronics & Communication Engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="Luna AI" />,
});
