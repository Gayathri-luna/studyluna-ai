import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface LearnerProfile {
  branch: string | null;
  year: string | null;
  careerGoal: string | null;
  learningSpeed: string | null;
}

interface AuthValue extends LearnerProfile {
  session: Session | null;
  user: User | null;
  loading: boolean;
  setBranch: (slug: string) => void;
  updateProfile: (patch: Partial<LearnerProfile>) => void;
}

const EMPTY: LearnerProfile = { branch: null, year: null, careerGoal: null, learningSpeed: null };

const AuthContext = createContext<AuthValue>({
  ...EMPTY,
  session: null,
  user: null,
  loading: true,
  setBranch: () => {},
  updateProfile: () => {},
});

const PROFILE_KEY = "luna-profile";
const BRANCH_KEY = "luna-branch";

function readLocal(): LearnerProfile {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<LearnerProfile>) : {};
    return {
      ...EMPTY,
      ...parsed,
      branch: parsed.branch ?? localStorage.getItem(BRANCH_KEY),
    };
  } catch {
    return { ...EMPTY, branch: localStorage.getItem(BRANCH_KEY) };
  }
}

function writeLocal(profile: LearnerProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  if (profile.branch) localStorage.setItem(BRANCH_KEY, profile.branch);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<LearnerProfile>(EMPTY);

  useEffect(() => {
    setProfile(readLocal());

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
      .select("branch, year, career_goal, learning_speed")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const local = readLocal();
        if (data?.branch) {
          const next: LearnerProfile = {
            branch: data.branch,
            year: data.year ?? local.year,
            careerGoal: data.career_goal ?? local.careerGoal,
            learningSpeed: data.learning_speed ?? local.learningSpeed,
          };
          writeLocal(next);
          setProfile(next);
        } else if (local.branch) {
          void supabase
            .from("profiles")
            .update({
              branch: local.branch,
              year: local.year,
              career_goal: local.careerGoal,
              learning_speed: local.learningSpeed,
            })
            .eq("id", userId);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const value = useMemo<AuthValue>(() => {
    const updateProfile = (patch: Partial<LearnerProfile>) => {
      setProfile((current) => {
        const next = { ...current, ...patch };
        writeLocal(next);
        if (userId) {
          void supabase
            .from("profiles")
            .update({
              branch: next.branch,
              year: next.year,
              career_goal: next.careerGoal,
              learning_speed: next.learningSpeed,
            })
            .eq("id", userId);
        }
        return next;
      });
    };

    return {
      ...profile,
      session,
      user: session?.user ?? null,
      loading,
      setBranch: (slug: string) => updateProfile({ branch: slug }),
      updateProfile,
    };
  }, [session, loading, profile, userId]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
