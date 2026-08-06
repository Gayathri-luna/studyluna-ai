import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  branch: string | null;
  setBranch: (slug: string) => void;
}

const AuthContext = createContext<AuthValue>({
  session: null,
  user: null,
  loading: true,
  branch: null,
  setBranch: () => {},
});

const BRANCH_KEY = "luna-branch";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [branch, setBranchState] = useState<string | null>(null);

  useEffect(() => {
    setBranchState(localStorage.getItem(BRANCH_KEY));

    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });

    void supabase.auth.getSession().then(({ data: result }) => {
      setSession(result.session);
      setLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id ?? null;

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void supabase
      .from("profiles")
      .select("branch")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const stored = localStorage.getItem(BRANCH_KEY);
        if (data?.branch) {
          localStorage.setItem(BRANCH_KEY, data.branch);
          setBranchState(data.branch);
        } else if (stored) {
          void supabase.from("profiles").update({ branch: stored }).eq("id", userId);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const value = useMemo<AuthValue>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      branch,
      setBranch: (slug: string) => {
        localStorage.setItem(BRANCH_KEY, slug);
        setBranchState(slug);
        if (userId) void supabase.from("profiles").update({ branch: slug }).eq("id", userId);
      },
    }),
    [session, loading, branch, userId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
