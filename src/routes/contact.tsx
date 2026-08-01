import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Luna.io" },
      {
        name: "description",
        content: "Get in touch with the Luna.io team.",
      },
      { property: "og:title", content: "Contact — Luna.io" },
      {
        property: "og:description",
        content: "Get in touch with the Luna.io team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="Contact" />,
});
