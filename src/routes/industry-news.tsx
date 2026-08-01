import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/industry-news")({
  head: () => ({
    meta: [
      { title: "Industry News — Luna.io" },
      {
        name: "description",
        content:
          "Stay updated with the latest trends and news in Electronics & Communication Engineering.",
      },
      { property: "og:title", content: "Industry News — Luna.io" },
      {
        property: "og:description",
        content:
          "Stay updated with the latest trends and news in Electronics & Communication Engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="Industry News" />,
});
