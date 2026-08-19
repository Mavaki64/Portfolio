"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const cardClassName =
  "flex w-[110px] flex-col items-center gap-3 rounded-xl border border-foreground/10 bg-surface px-3 py-4 motion-safe:transition-[transform,border-color] motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:scale-[1.03] hover:border-primary/70";

export default function Skill({
  title,
  logo,
  alt,
  index = 0,
}: {
  title: string;
  logo: string;
  alt: string;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={cardClassName}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.2,
        delay: reduceMotion ? 0 : (index % 4) * 0.04,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      <Image
        src={logo}
        alt={alt}
        width={40}
        height={40}
        className="size-10 object-contain"
      />
      <h4 className="text-center font-text text-sm text-foreground">{title}</h4>
    </motion.article>
  );
}

export function SoftSkill({
  title,
  index = 0,
}: {
  title: string;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`${cardClassName} justify-center`}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.2,
        delay: reduceMotion ? 0 : (index % 3) * 0.04,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      <h4 className="text-center font-text text-sm text-foreground">{title}</h4>
    </motion.article>
  );
}
