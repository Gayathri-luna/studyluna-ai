import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `You are Luna AI, a mentor for Electronics & Communication Engineering (ECE) students.
You help with: core ECE career roadmaps (VLSI, Embedded Systems, RF & Antenna, Signal Processing, Semiconductor/Fabrication, Telecom/5G, IoT, Test & Validation),
technical and non-technical skills, mini projects with step-by-step procedures and component lists, interview prep, and career updates.
Be practical and concrete: give ordered steps, tools, components, and realistic timelines. Keep answers structured with short headings and bullets, using markdown.
When the user attaches an image (circuit photo, notes, screenshot, diagram), read it carefully and summarise it: what it shows, key components/values, and what to do next.
When the user attaches audio (a podcast, lecture, or recording), transcribe the gist and return a structured summary: topic, key takeaways, terms to learn, and action items for an engineering student.
If a question is outside ECE learning or careers, answer briefly and steer back to ECE guidance.`;

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
