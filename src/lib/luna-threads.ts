import type { UIMessage } from "ai";

export const LUNA_VERSION = "LunaAI 7.0 🚀";
export const LUNA_SUBTITLE = "Your Multimodal AI Learning Assistant";

export const LEARN_MODES = [
  { id: "learn", label: "Learn", hint: "Detailed concept explanation" },
  { id: "exam", label: "Exam", hint: "Exam-focused structured answers" },
  { id: "quick", label: "Quick", hint: "Short, direct answers" },
  { id: "practice", label: "Practice", hint: "Questions and quizzes" },
  { id: "revision", label: "Revision", hint: "Fast revision notes" },
  { id: "project", label: "Project", hint: "Project guidance & builds" },
] as const;

export type LunaMode = (typeof LEARN_MODES)[number]["id"];

export const PODCAST_OUTPUTS = [
  { id: "short", label: "Short Summary" },
  { id: "detailed", label: "Detailed Summary" },
  { id: "takeaways", label: "Key Takeaways" },
  { id: "terms", label: "Important Terms" },
  { id: "questions", label: "Exam Questions" },
  { id: "flashcards", label: "Flashcards" },
] as const;

export type PodcastOutput = (typeof PODCAST_OUTPUTS)[number]["id"];

export type LunaThread = {
  id: string;
  title: string;
  updatedAt: number;
  mode: LunaMode;
  messages: UIMessage[];
};

const KEY = "luna-ai-threads-v7";

function isBrowser() {
  return typeof window !== "undefined";
}

export function newThreadId() {
  return isBrowser() && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

export function loadThreads(): LunaThread[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as LunaThread[]) : [];
    return Array.isArray(parsed) ? parsed.sort((a, b) => b.updatedAt - a.updatedAt) : [];
  } catch {
    return [];
  }
}

export function saveThreads(threads: LunaThread[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(threads));
  } catch {
    /* quota — ignore */
  }
}

export function createThread(mode: LunaMode = "learn"): LunaThread {
  return { id: newThreadId(), title: "New chat", updatedAt: Date.now(), mode, messages: [] };
}

export function upsertThread(thread: LunaThread): LunaThread[] {
  const rest = loadThreads().filter((t) => t.id !== thread.id);
  const next = [{ ...thread, updatedAt: Date.now() }, ...rest].sort(
    (a, b) => b.updatedAt - a.updatedAt,
  );
  saveThreads(next);
  return next;
}

export function deleteThread(id: string): LunaThread[] {
  const next = loadThreads().filter((t) => t.id !== id);
  saveThreads(next);
  return next;
}

export function titleFromMessages(messages: UIMessage[], fallback = "New chat") {
  const first = messages.find((m) => m.role === "user");
  if (!first) return fallback;
  const text = first.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join(" ")
    .trim();
  if (!text) return "Media upload";
  return text.length > 48 ? `${text.slice(0, 48)}…` : text;
}
