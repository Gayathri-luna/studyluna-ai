import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Luna.io" },
      {
        name: "description",
        content: "Read the Luna.io terms of service.",
      },
      { property: "og:title", content: "Terms of Service — Luna.io" },
      {
        property: "og:description",
        content: "Read the Luna.io terms of service.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="Terms of Service" />,
});
