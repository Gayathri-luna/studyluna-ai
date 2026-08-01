import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Luna.io" },
      {
        name: "description",
        content: "Join the Luna.io community of ECE learners, professionals, and innovators.",
      },
      { property: "og:title", content: "Community — Luna.io" },
      {
        property: "og:description",
        content: "Join the Luna.io community of ECE learners, professionals, and innovators.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="Community" />,
});
