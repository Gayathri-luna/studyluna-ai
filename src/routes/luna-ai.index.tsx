import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { createThread, loadThreads, upsertThread } from "@/lib/luna-threads";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/luna-ai/")({
  component: LunaIndex,
});

function LunaIndex() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;
    const existing = loadThreads();
    const target = existing[0] ?? createThread();
    if (!existing[0]) upsertThread(target);
    void navigate({ to: "/luna-ai/$threadId", params: { threadId: target.id }, replace: true });
  }, [navigate, user, loading]);

  return <p className="text-sm text-muted-foreground">Opening LunaAI…</p>;
}
