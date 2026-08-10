import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Plus, Square, Copy, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const MODES = [
  { id: "Learn", version: "V1", title: "Learn", prompt: "Explain a concept clearly from the basics." },
  { id: "Practice", version: "V2", title: "Practice", prompt: "Give me practice questions on my current topic." },
  { id: "Solve", version: "V3", title: "Solve", prompt: "Help me solve this problem step by step with hints." },
  { id: "Projects", version: "V4", title: "Projects", prompt: "Suggest a practical project for my branch." },
  { id: "Revision", version: "V5", title: "Revision", prompt: "Make quick revision notes and a self-test." },
  { id: "Assess", version: "V6", title: "Assess", prompt: "Test me and identify my weak topics." },
  { id: "Personalized", version: "V7", title: "Personalized", prompt: "Recommend what I should learn next." },
] as const;

const BRANCHES = ["ECE", "CSE", "IT", "EEE", "Mechanical", "Civil", "Chemical", "Biotech", "Aerospace", "AI & DS"];
const SUGGESTIONS: Record<string, string[]> = {
  Learn: ["Explain Kirchhoff's laws with a simple example", "Teach me microcontrollers from the basics", "Explain DSA like I am a beginner"],
  Practice: ["Give me 10 MCQs on digital electronics", "Practice Python loops with me", "Quiz me on signals and systems"],
  Solve: ["Help me solve this circuit step by step", "Give me hints for this programming problem", "Help me find my mistake"],
  Projects: ["Suggest an IoT project I can actually build", "Give me an AI + embedded project", "Plan a beginner FPGA project"],
  Revision: ["Make a one-page revision sheet", "Give me flashcards for this topic", "Test my important formulas"],
  Assess: ["Give me a 10-question test", "Evaluate my answers and find weak topics", "Create a branch-specific mock test"],
  Personalized: ["What should I learn next?", "Build my weekly learning plan", "Suggest a path based on my interests"],
};

export const Route = createFileRoute("/luna-ai")({
  head: () => ({ meta: [{ title: "LUNA.AI — Learning Assistant | LUNA.IO" }, { name: "description", content: "LUNA.AI learning assistant: Learn, Practice, Solve, Build, Revise, Assess and Improve." }] }),
  component: LunaAIPage,
});

function MessageMarkdown({ text }: { text: string }) {
  return <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground"><ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown></div>;
}

function LunaAIPage() {
  const [branch, setBranch] = useState("ECE");
  const [mode, setMode] = useState("Learn");
  const [input, setInput] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    transport,
    onError: (error) => toast.error(error.message || "LUNA.AI could not respond. Please try again."),
  });
  const isLoading = status === "submitted" || status === "streaming";
  const selectedMode = MODES.find((item) => item.id === mode) ?? MODES[0];

  useEffect(() => { textareaRef.current?.focus(); }, [isLoading]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, status]);

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    setLastPrompt(trimmed);
    void sendMessage({ text: trimmed, body: { branch, mode } });
  };

  const newChat = () => { stop(); setMessages([]); setInput(""); setLastPrompt(""); };
  const regenerate = () => { if (lastPrompt && !isLoading) void sendMessage({ text: lastPrompt, body: { branch, mode } }); };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col px-4 py-8 sm:py-10">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"><Sparkles className="h-3.5 w-3.5" /> LUNA.AI</div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Your AI Learning Assistant</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">Learn → Practice → Solve → Build → Revise → Assess → Improve</p>
      </header>

      <section className="mt-6 rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
          <label className="text-sm font-medium">Engineering branch<select value={branch} onChange={(e) => setBranch(e.target.value)} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">{BRANCHES.map((item) => <option key={item}>{item}</option>)}</select></label>
          <div><p className="text-sm font-medium">Learning mode</p><div className="mt-1.5 flex flex-wrap gap-1.5">{MODES.map((item) => <button key={item.id} type="button" onClick={() => setMode(item.id)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${mode === item.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:bg-accent"}`} title={item.prompt}>{item.version} {item.title}</button>)}</div></div>
        </div>
        <div className="mt-3 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground"><span className="font-semibold text-foreground">{selectedMode.version} {selectedMode.title}:</span> {selectedMode.prompt} <span className="ml-1">• Focus: {branch}</span></div>
      </section>

      <div ref={scrollRef} className="mt-4 flex-1 space-y-5 overflow-y-auto rounded-2xl border border-border bg-muted/20 p-4 sm:p-6">
        {messages.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-primary/10 p-4 text-primary"><Sparkles className="h-7 w-7" /></div>
            <h2 className="mt-4 text-lg font-bold">Ready to learn {branch}</h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">Choose a mode above, then ask LUNA.AI a question.</p>
            <div className="mt-5 flex max-w-2xl flex-wrap justify-center gap-2">{(SUGGESTIONS[mode] ?? SUGGESTIONS.Learn).map((suggestion) => <button key={suggestion} type="button" onClick={() => submit(suggestion)} className="rounded-full border border-border bg-background px-4 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground">{suggestion}</button>)}</div>
          </div>
        ) : messages.map((message) => {
          const text = message.parts.map((part) => part.type === "text" ? part.text : "").join("");
          const isUser = message.role === "user";
          return <div key={message.id} className={isUser ? "flex justify-end" : "space-y-1"}><div className={isUser ? "max-w-[85%] rounded-xl bg-primary px-4 py-3 text-sm text-primary-foreground" : "max-w-[95%]"}>{isUser ? <div className="whitespace-pre-wrap">{text}</div> : <MessageMarkdown text={text} />}</div>{!isUser && text && !isLoading && <div className="flex gap-1"><button type="button" onClick={() => navigator.clipboard.writeText(text).then(() => toast.success("Copied"))} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent"><Copy className="h-3 w-3" /> Copy</button><button type="button" onClick={regenerate} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent"><RotateCcw className="h-3 w-3" /> Regenerate</button></div>}</div>;
        })}
        {status === "submitted" && <p className="animate-pulse text-sm text-muted-foreground">LUNA.AI is thinking…</p>}
      </div>

      <form className="mt-3 flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); submit(input); }}>
        <Textarea ref={textareaRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(input); } }} placeholder={`Ask LUNA.AI to ${mode.toLowerCase()} ${branch}…`} rows={2} className="resize-none" />
        {isLoading ? <Button type="button" size="icon" variant="outline" onClick={stop}><Square className="h-4 w-4" /></Button> : <Button type="submit" size="icon" disabled={!input.trim()}><Send className="h-4 w-4" /></Button>}
      </form>
      <div className="mt-2 flex items-center justify-between"><p className="text-[11px] text-muted-foreground">LUNA.AI • {branch} • {selectedMode.version} {selectedMode.title}</p><Button type="button" variant="outline" size="sm" onClick={newChat}><Plus className="mr-1 h-3.5 w-3.5" /> New chat</Button></div>
    </div>
  );
}
