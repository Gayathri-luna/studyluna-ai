import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared Framer Motion layer for LUNA.
 * Every helper collapses to a no-op transition when the user prefers reduced motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts route content on navigation. */
export function MotionPage({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Wrap a list/grid so its direct <Reveal> children animate in sequence on scroll. */
export function Stagger({
  children,
  className,
  delay = 0,
  ...rest
}: { children: ReactNode; delay?: number } & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : 0.07, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** A single scroll-triggered reveal. Works standalone or inside <Stagger>. */
export function Reveal({
  children,
  className,
  y = 16,
  ...rest
}: { children: ReactNode; y?: number } & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.45, ease: EASE } },
      }}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Subtle lift + glow on hover, for cards and tiles. */
export function HoverLift({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduced ? undefined : { y: -4, boxShadow: "var(--glow-primary)" }}
      whileTap={reduced ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.2, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Ambient breathing glow behind hero/brand elements. Purely decorative. */
export function LunaGlow({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={
        className ??
        "pointer-events-none absolute left-1/2 top-0 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]"
      }
      initial={{ opacity: reduced ? 0.35 : 0.25, scale: 1 }}
      animate={reduced ? { opacity: 0.35 } : { opacity: [0.22, 0.45, 0.22], scale: [1, 1.08, 1] }}
      transition={reduced ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
