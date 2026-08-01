import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send } from "lucide-react";
import { toast } from "sonner";

const DESCRIPTION =
  "Luna AI is an ECE mentor that builds personalised roadmaps, explains concepts, and guides you through mini projects step by step.";

export const Route = createFileRoute("/luna-ai")({
  head: () => ({
    meta: [
      { title: "Luna AI — Your ECE Mentor | Luna.io" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Luna AI — Your ECE Mentor" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LunaAIPage,
});

const SUGGESTIONS = [
  "Build me a 6-month VLSI roadmap for a 5th-semester student",
  "Which non-technical skills matter most for embedded interviews?",
  "Give me a step-by-step procedure for a TinyML mini project",
  "What ECE career updates should I act on this year?",
];

function LunaAIPage() {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport,
    onError: (error) => {
      toast.error(
        error.message.includes("429")
          ? "Too many requests right now — please try again in a moment."
          : error.message.includes("402")
            ? "AI credits are exhausted. Please add credits to continue."
            : "Luna AI could not respond. Please try again.",
      );
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isLoading) textareaRef.current?.focus();
  }, [isLoading]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    void sendMessage({ text: trimmed });
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 py-10">
      <header className="text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          <Sparkles className="h-7 w-7 text-primary" />
          Luna AI
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your ECE mentor for roadmaps, skills, mini projects, and career moves.
        </p>
      </header>

      <div
        ref={scrollRef}
        className="mt-8 flex-1 space-y-4 overflow-y-auto rounded-lg border border-border bg-muted/30 p-4"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-10">
            <p className="text-sm text-muted-foreground">
              Try one of these to get started:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => submit(suggestion)}
                  className="rounded-full border border-border bg-background px-4 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const text = message.parts
              .map((part) => (part.type === "text" ? part.text : ""))
              .join("");
            const isUser = message.role === "user";
            return (
              <div
                key={message.id}
                className={isUser ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm ${
                    isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground border border-border"
                  }`}
                >
                  {text}
                </div>
              </div>
            );
          })
        )}

        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
              Luna AI is thinking…
            </div>
          </div>
        )}
      </div>

      <form
        className="mt-4 flex items-end gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          submit(input);
        }}
      >
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit(input);
            }
          }}
          placeholder="Ask about roadmaps, skills, projects, or careers…"
          rows={2}
          className="resize-none"
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
