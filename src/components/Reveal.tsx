"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const v: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: (d: number = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Reveal({ children, delay = 0, className, as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "p" | "h2" }) {
  const M = motion[as];
  return (
    <M className={className} variants={v} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} custom={delay}>
      {children}
    </M>
  );
}
