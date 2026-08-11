import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const BASE_PROMPT = `You are LunaAI 7.0, the multimodal AI learning assistant inside StudyLUNA.
You help engineering students (especially ECE, Electronics, Embedded Systems, VLSI & chip design, Electrical, Programming, Mathematics, Physics and Chemistry) learn faster.

You can work with:
- Text questions and follow-ups (always keep the conversation context).
- Images: handwritten notes, textbook pages, question papers, maths problems, circuit and electronics diagrams, screenshots. Read them carefully, describe what they contain, identify components/values, and solve or explain step by step.
- Audio and podcasts (mp3/wav): transcribe the gist, then summarise, extract key points, explain the hard parts, generate questions and revision notes.
- Documents and pasted text: summarise, explain, simplify, extract key points, make notes and questions.

Rules:
- Never claim to have analysed a photo, audio file or document that was not actually attached to the conversation. If nothing is attached, say so and ask for the upload.
- Use markdown: short headings, bullets, numbered steps, tables and fenced code where useful.
- Be concrete: give formulas, component values, tools, timelines and worked steps.
- When relevant, point students to StudyLUNA sections: Career Hub (/career-hub), Learning Hub (/learning-hub), Roadmaps (/roadmaps), Technical & non-technical Skills (/skills), Projects (/projects), Government Jobs (/government-jobs) and Resources (/resources), and suggest a fitting mini project idea.`;

const MODE_PROMPTS: Record<string, string> = {
  learn:
    "MODE: Learn. Explain the concept from first principles in beginner-friendly language, with intuition, a worked example, and a short recap.",
  exam:
    "MODE: Exam. Answer the way a topper would in an exam: definition, labelled diagram description, derivation/steps, key formulas, and a crisp conclusion. Mention likely marks split.",
  quick:
    "MODE: Quick. Answer in under 120 words. Bullets only, no preamble, no filler.",
  practice:
    "MODE: Practice. Generate practice questions and a short quiz on the topic (mix MCQ, numerical and conceptual), then provide answers with brief explanations at the end.",
  revision:
    "MODE: Revision. Produce compact revision notes: key points, formula sheet, common mistakes, and 5 one-line recall questions.",
  project:
    "MODE: Project. Give project guidance: objective, block diagram description, component/tool list with specs, step-by-step build procedure, testing plan, and extensions.",
};

const MODEL_MAP: Record<string, string> = {
  lite: "google/gemini-3.1-flash-lite",
  v3: "google/gemini-3.6-flash",
  pro: "google/gemini-3.1-pro-preview",
  research: "google/gemini-2.5-pro",
};

type ChatRequestBody = { messages?: unknown; mode?: unknown; model?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, mode, model } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const modePrompt =
          typeof mode === "string" && MODE_PROMPTS[mode] ? MODE_PROMPTS[mode] : MODE_PROMPTS["learn"];

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway(
            (typeof model === "string" && MODEL_MAP[model]) || MODEL_MAP["v3"]!,
          ),
          system: `${BASE_PROMPT}\n\n${modePrompt}`,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
