import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Send,
  Paperclip,
  Image as ImageIcon,
  Mic,
  X,
  Copy,
  Check,
  RotateCcw,
  Plus,
  Square,
} from "lucide-react";
import { toast } from "sonner";

const DESCRIPTION =
  "Luna AI is an ECE mentor that summarises podcasts and photos, builds personalised roadmaps, and guides you through mini projects step by step.";

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
  "Summarise this podcast episode and list the key takeaways",
  "Explain the circuit in this photo and what it does",
  "Give me a step-by-step procedure for a TinyML mini project",
];

const IMAGE_TYPES = "image/png,image/jpeg,image/jpg,image/webp,image/gif";
const AUDIO_TYPES = "audio/mpeg,audio/mp3,audio/wav,audio/x-wav";
const MAX_FILE_MB = 20;

type Attachment = { id: string; file: File; url: string };

function MessageMarkdown({ text }: { text: string }) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-code:text-primary">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label="Copy response"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function LunaAIPage() {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [lastPrompt, setLastPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, stop, setMessages } = useChat({
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

  useEffect(() => {
    return () => {
      attachments.forEach((a) => URL.revokeObjectURL(a.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next: Attachment[] = [];
    for (const file of Array.from(list)) {
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        toast.error(`${file.name} is larger than ${MAX_FILE_MB}MB.`);
        continue;
      }
      next.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
      });
    }
    if (next.length) setAttachments((prev) => [...prev, ...next]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((a) => a.id !== id);
    });
  };

  const submit = (text: string) => {
    const trimmed = text.trim();
    if ((!trimmed && attachments.length === 0) || isLoading) return;

    const dataTransfer = new DataTransfer();
    attachments.forEach((a) => dataTransfer.items.add(a.file));

    const prompt =
      trimmed ||
      (attachments.some((a) => a.file.type.startsWith("audio"))
        ? "Summarise this audio and list the key takeaways."
        : "Summarise this and explain it clearly.");

    setInput("");
    setLastPrompt(prompt);
    void sendMessage({
      text: prompt,
      files: attachments.length ? dataTransfer.files : undefined,
    });
    attachments.forEach((a) => URL.revokeObjectURL(a.url));
    setAttachments([]);
  };

  const newChat = () => {
    stop();
    setMessages([]);
    setInput("");
    setAttachments([]);
    textareaRef.current?.focus();
  };

  const regenerate = () => {
    if (!lastPrompt || isLoading) return;
    void sendMessage({ text: lastPrompt });
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 py-10">
      <header className="text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          <Sparkles className="h-7 w-7 text-primary" />
          Luna AI
        </h1>
        <p className="mt-3 text-muted-foreground">
          Ask anything, drop a photo, or upload a podcast — Luna summarises it and
          turns it into an action plan.
        </p>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm" onClick={newChat}>
            <Plus className="mr-1 h-4 w-4" />
            New chat
          </Button>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="mt-6 flex-1 space-y-5 overflow-y-auto rounded-lg border border-border bg-muted/30 p-4"
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
            const isUser = message.role === "user";
            const text = message.parts
              .map((part) => (part.type === "text" ? part.text : ""))
              .join("");
            const files = message.parts.filter(
              (part): part is Extract<typeof part, { type: "file" }> =>
                part.type === "file",
            );

            if (isUser) {
              return (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[85%] space-y-2">
                    {files.length > 0 && (
                      <div className="flex flex-wrap justify-end gap-2">
                        {files.map((file, index) =>
                          file.mediaType?.startsWith("image/") ? (
                            <img
                              key={index}
                              src={file.url}
                              alt={file.filename ?? "Uploaded image"}
                              className="h-28 w-28 rounded-lg border border-border object-cover"
                            />
                          ) : (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground"
                            >
                              <Mic className="h-3 w-3" />
                              {file.filename ?? "Attachment"}
                            </span>
                          ),
                        )}
                      </div>
                    )}
                    {text && (
                      <div className="whitespace-pre-wrap rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground">
                        {text}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div key={message.id} className="space-y-1">
                <MessageMarkdown text={text} />
                {text && !isLoading && (
                  <div className="flex items-center gap-1">
                    <CopyButton text={text} />
                    <button
                      type="button"
                      onClick={regenerate}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Regenerate
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}

        {status === "submitted" && (
          <p className="animate-pulse text-sm text-muted-foreground">
            Luna AI is thinking…
          </p>
        )}
      </div>

      {attachments.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="relative flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground"
            >
              {attachment.file.type.startsWith("image/") ? (
                <img
                  src={attachment.url}
                  alt={attachment.file.name}
                  className="h-8 w-8 rounded object-cover"
                />
              ) : (
                <Mic className="h-4 w-4 text-primary" />
              )}
              <span className="max-w-[10rem] truncate">{attachment.file.name}</span>
              <button
                type="button"
                aria-label={`Remove ${attachment.file.name}`}
                onClick={() => removeAttachment(attachment.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form
        className="mt-3 flex items-end gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          submit(input);
        }}
      >
        <input
          ref={imageInputRef}
          type="file"
          accept={IMAGE_TYPES}
          multiple
          hidden
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <input
          ref={audioInputRef}
          type="file"
          accept={AUDIO_TYPES}
          hidden
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={`${IMAGE_TYPES},${AUDIO_TYPES}`}
          multiple
          hidden
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />

        <div className="flex gap-1">
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Upload photo"
            onClick={() => imageInputRef.current?.click()}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Upload podcast audio (mp3 or wav)"
            onClick={() => audioInputRef.current?.click()}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Attach file"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>

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
          placeholder="Ask anything, or attach a photo / podcast to summarise…"
          rows={2}
          className="resize-none"
        />

        {isLoading ? (
          <Button type="button" size="icon" variant="outline" onClick={() => stop()}>
            <Square className="h-4 w-4" />
            <span className="sr-only">Stop</span>
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() && attachments.length === 0}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        )}
      </form>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Photos and mp3/wav podcasts up to {MAX_FILE_MB}MB. Enter to send, Shift+Enter for a new line.
      </p>
    </div>
  );
}
