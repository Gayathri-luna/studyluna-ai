import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Luna.io" },
      {
        name: "description",
        content: "Read the Luna.io privacy policy.",
      },
      { property: "og:title", content: "Privacy Policy — Luna.io" },
      {
        property: "og:description",
        content: "Read the Luna.io privacy policy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="Privacy Policy" />,
});
