import type { Variants } from "framer-motion";

/* ── Shared easing curves ── */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

export const durations = {
  pageEnter: 0.26,
  pageExit: 0.15,
  hover: 0.2,
  reveal: 0.32,
  modal: 0.2,
  modalExit: 0.12,
};

/* ── Fade up (for individual items) ── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.reveal, ease: ease.out },
  },
};

/* ── Fade in from left ── */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.reveal, ease: ease.out },
  },
};

/* ── Fade in from right ── */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.reveal, ease: ease.out },
  },
};

/* ── Scale fade (for cards, modals) ── */
export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.modal, ease: ease.out },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: durations.modalExit },
  },
};

/* ── Stagger container ── */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

/* ── Fast stagger (for grids with many items) ── */
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

/* ── Slide overlay (for drawers, panels) ── */
export const slideRight: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: ease.out },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.3, ease: ease.inOut },
  },
};

/* ── Backdrop ── */
export const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.5,
    transition: { duration: durations.modal },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.modalExit },
  },
};

/* ── Height expand (for accordions, list additions) ── */
export const expandHeight: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.28, ease: ease.out },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.18, ease: ease.inOut },
  },
};

/* ── Page transition ── */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.pageEnter, ease: ease.out },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.pageExit },
  },
};

export const listItemReveal = (index = 0): Variants => ({
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.reveal,
      delay: index * 0.1,
      ease: ease.out,
    },
  },
});

export const dropdownTransition = {
  initial: { opacity: 0, scaleY: 0.96, y: -8, transformOrigin: "top" },
  animate: {
    opacity: 1,
    scaleY: 1,
    y: 0,
    transition: { duration: 0.15, ease: ease.out },
  },
  exit: {
    opacity: 0,
    scaleY: 0.98,
    y: -4,
    transition: { duration: 0.12, ease: ease.inOut },
  },
} as const;

export const slideOverTransition = {
  initial: { opacity: 0, x: "100%" },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: ease.out },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.12, ease: ease.inOut },
  },
} as const;

/* ── Reusable viewport config (trigger once) ── */
export const viewportOnce = { once: true, amount: 0.15 } as const;
