ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS year text,
  ADD COLUMN IF NOT EXISTS career_goal text,
  ADD COLUMN IF NOT EXISTS learning_speed text;