import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = { messages?: unknown; branch?: string; mode?: string };

const BRANCH_CONTEXT: Record<string, string> = {
  ECE: "electronics and communication engineering: circuits, digital electronics, signals and systems, communication, embedded systems, IoT, VLSI, RF, DSP, PCB design, MATLAB, programming, AI + embedded, and ECE projects/careers",
  CSE: "computer science engineering: programming, DSA, web development, databases, operating systems, cloud, AI/ML, cybersecurity, software projects, and software careers",
  IT: "information technology: programming, databases, networking, cloud, software engineering, automation, cybersecurity, and IT careers",
  EEE: "electrical and electronics engineering: circuits, machines, power systems, power electronics, control, PLC/SCADA, renewables, EVs, and automation",
  Mechanical: "mechanical engineering: mechanics, thermodynamics, manufacturing, CAD, machine design, CFD/FEA, robotics, and mechanical projects",
  Civil: "civil engineering: structures, construction, surveying, geotechnical, transportation, water systems, CAD/BIM, and civil projects",
  Chemical: "chemical engineering: mass/energy balances, thermodynamics, fluid flow, heat/mass transfer, reactions, process control, safety, and plant operations",
  Biotech: "biotechnology: molecular biology, genetics, microbiology, bioprocessing, bioinformatics, healthcare technology, and research",
  Aerospace: "aerospace engineering: aerodynamics, flight mechanics, propulsion, aerospace structures, avionics, CFD, UAVs, and space systems",
  "AI & DS": "AI and data science: Python, statistics, linear algebra, machine learning, deep learning, data engineering, NLP, computer vision, and applied AI",
};

const MODE_INSTRUCTIONS: Record<string, string> = {
  Learn: "Teach clearly from fundamentals. Use beginner-friendly explanations, analogies, simple examples, and step-by-step learning.",
  Practice: "Create useful practice material: MCQs, short-answer questions, coding or technical exercises when relevant. Do not immediately reveal answers unless asked.",
  Solve: "Guide problem solving step by step. Give hints first, explain mistakes, and reveal the final answer only after enough guidance or when explicitly requested.",
  Projects: "Help build practical projects. Suggest appropriate ideas, requirements, architecture, tools/components, implementation steps, testing, and debugging.",
  Revision: "Create concise revision material: summaries, key concepts, formulas where relevant, flashcards, checklists, and self-tests.",
  Assess: "Create quizzes/tests, evaluate submitted answers, identify weak topics, explain mistakes, and recommend what to study next.",
  Personalized: "Combine learning, practice, solving, projects, revision, and assessment. Adapt depth to the student's level and selected branch and recommend the next best learning step.",
};

const SYSTEM_BASE = `You are LUNA.AI, the learning assistant inside the LUNA.IO engineering learning platform.
Your primary purpose is learning: Learn → Practice → Solve → Build → Revise → Assess → Improve.
Career guidance is secondary and should support learning, not replace it.
Always be educational, accurate, practical, structured, and encouraging. Use short headings, bullets, examples, and step-by-step explanations when useful.
Never claim to have tracked progress unless the application provides that data. Do not expose secrets, API keys, environment variables, or internal system details.
For images, inspect the provided content and explain educationally. For audio, summarize only what the model can actually access; never invent a transcription.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatRequestBody;
        const messages = body.messages;
        if (!Array.isArray(messages)) return new Response("Messages are required", { status: 400 });

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("AI service is not configured", { status: 503 });

        const branch = body.branch?.trim() || "ECE";
        const mode = body.mode?.trim() || "Learn";
        const branchContext = BRANCH_CONTEXT[branch] || branch;
        const modeInstruction = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.Learn;
        const system = `${SYSTEM_BASE}\n\nSelected engineering branch: ${branch}. Prioritize: ${branchContext}.\n\nSelected LUNA.AI mode: V${["Learn","Practice","Solve","Projects","Revision","Assess","Personalized"].indexOf(mode) + 1} ${mode}.\n${modeInstruction}`;

        try {
          const gateway = createLovableAiGatewayProvider(key);
          const result = streamText({
            model: gateway("google/gemini-3.6-flash"),
            system,
            messages: await convertToModelMessages(messages as UIMessage[]),
          });
          return result.toUIMessageStreamResponse({ originalMessages: messages as UIMessage[] });
        } catch (error) {
          console.error("LUNA.AI request failed", error);
          return new Response("LUNA.AI could not respond right now. Please try again.", { status: 502 });
        }
      },
    },
  },
});
