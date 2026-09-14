import {
  Award,
  CircleCheck,
  Sparkle,
  Star,
  Target,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type HeroDecoration = {
  Icon?: LucideIcon;
  symbol?: string;
  top: string;
  right: string;
  color: string;
  rotate: number;
  size: number;
};

export const heroDecorations: HeroDecoration[] = [
  // ─────────────────────────────────────
  // Original decorations
  // ─────────────────────────────────────

  //   done
  {
    symbol: "?",
    top: "15%",
    right: "36%",
    color: "#E0A83F",
    rotate: -8,
    size: 30,
  },

  {
    Icon: Sparkle,
    top: "48%",
    right: "12%",
    color: "#3A6B4A",
    rotate: 0,
    size: 32,
  },

  {
    Icon: Star,
    top: "30%",
    right: "26%",
    color: "#E0A83F",
    rotate: 10,
    size: 30,
  },

  {
    Icon: Target,
    top: "70%",
    right: "30%",
    color: "#3A6B4A",
    rotate: 5,
    size: 30,
  },

  {
    Icon: Trophy,
    top: "70%",
    right: "20%",
    color: "#1B1F3B",
    rotate: -6,
    size: 30,
  },

  {
    symbol: "!",
    top: "35%",
    right: "22%",
    color: "#C0392B",
    rotate: 6,
    size: 26,
  },

  {
    Icon: Zap,
    top: "20%",
    right: "57%",
    color: "#C0392B",
    rotate: -12,
    size: 26,
  },

  {
    Icon: Award,
    top: "72%",
    right: "60%",
    color: "#E0A83F",
    rotate: 8,
    size: 36,
  },

  {
    Icon: CircleCheck,
    top: "80%",
    right: "42%",
    color: "#1B1F3B",
    rotate: -4,
    size: 22,
  },

  // ─────────────────────────────────────
  // Extra decorations
  // ─────────────────────────────────────

  {
    Icon: Sparkle,
    top: "12%",
    right: "48%",
    color: "#C0392B",
    rotate: 15,
    size: 20,
  },

  {
    Icon: Star,
    top: "42%",
    right: "80%",
    color: "#E0A83F",
    rotate: -15,
    size: 24,
  },

  {
    Icon: Zap,
    top: "65%",
    right: "78%",
    color: "#E0A83F",
    rotate: 18,
    size: 20,
  },

  {
    symbol: "?",
    top: "55%",
    right: "86%",
    color: "#3A6B4A",
    rotate: 12,
    size: 20,
  },

  {
    symbol: "!",
    top: "24%",
    right: "86%",
    color: "#1B1F3B",
    rotate: -10,
    size: 22,
  },

  {
    Icon: Trophy,
    top: "45%",
    right: "16%",
    color: "#E0A83F",
    rotate: 12,
    size: 28,
  },

  {
    Icon: Award,
    top: "10%",
    right: "30%",
    color: "#3A6B4A",
    rotate: -12,
    size: 24,
  },

  {
    Icon: Target,
    top: "77%",
    right: "77%",
    color: "#C0392B",
    rotate: -8,
    size: 26,
  },

  {
    Icon: CircleCheck,
    top: "32%",
    right: "76%",
    color: "#3A6B4A",
    rotate: 8,
    size: 18,
  },

  {
    symbol: "✦",
    top: "16%",
    right: "72%",
    color: "#E0A83F",
    rotate: 20,
    size: 24,
  },

  {
    symbol: "✦",
    top: "28%",
    right: "67%",
    color: "#3A6B4A",
    rotate: -15,
    size: 18,
  },
];
