"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

const photoClassName =
  "rounded-full object-cover ring-2 ring-primary/50 shadow-[0_0_0_6px_color-mix(in_srgb,var(--primary)_12%,transparent)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:scale-[1.03]";

const ease = [0.32, 0.72, 0, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease },
  },
};

const fadePhoto: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease, delay: 0.28 },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="Home"
      className="flex min-h-screen w-full max-w-5xl flex-col justify-start gap-10 px-4 pt-24 pb-12 min-[425px]:items-center md:h-screen md:flex-row md:items-center md:justify-around md:gap-8 md:px-4 md:pt-0 md:pb-0 lg:px-5"
    >
      <motion.div
        className="flex flex-col items-start gap-5 min-[425px]:items-center md:items-start md:gap-8"
        variants={reduceMotion ? undefined : container}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "show"}
      >
        <motion.div
          variants={
            reduceMotion
              ? undefined
              : { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
          }
          className="flex flex-col items-start gap-2 min-[425px]:items-center md:items-start"
        >
          <motion.h1
            variants={reduceMotion ? undefined : fadeUp}
            className="text-center font-title text-4xl font-bold min-[375px]:text-5xl xl:text-7xl"
          >
            Killian GAYEZ
          </motion.h1>
          <motion.h2
            variants={reduceMotion ? undefined : fadeUp}
            className="text-center font-title text-lg font-semibold after:mt-1 after:block after:h-[4px] after:w-20 after:bg-primary after:content-[''] min-[375px]:text-xl min-[425px]:after:mx-auto md:after:mx-0 lg:text-xl xl:text-3xl xl:after:w-30"
          >
            Développeur Front-end Junior
          </motion.h2>
        </motion.div>

        <motion.p
          variants={reduceMotion ? undefined : fadeUp}
          className="max-w-sm text-left font-text text-base text-balance min-[375px]:text-xl min-[425px]:text-center md:text-left"
        >
          Je crée des interfaces web simples, accessibles et centrées
          utilisateur.
        </motion.p>

        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="flex flex-row flex-wrap items-start justify-start gap-3 min-[425px]:justify-center md:justify-start md:gap-4"
        >
          <Link
            href="#Projects"
            className="border border-primary bg-primary/20 px-4 py-2 text-center font-text text-foreground transition-colors hover:bg-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Voir mes projets
          </Link>
          <Link
            href="#Contact"
            className="border border-foreground px-4 py-2 text-center font-text text-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Me contacter
          </Link>
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-2 flex w-full justify-center md:hidden"
        >
          <Image
            src="/home.jpg"
            alt="Killian GAYEZ"
            width={400}
            height={400}
            className={`size-58 min-[375px]:size-72 ${photoClassName}`}
            priority
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="hidden shrink-0 md:block"
        variants={reduceMotion ? undefined : fadePhoto}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "show"}
      >
        <Image
          src="/home.jpg"
          alt="Killian GAYEZ"
          className={`size-76 xl:size-88 2xl:size-96 ${photoClassName}`}
          width={400}
          height={400}
          priority
        />
      </motion.div>
    </section>
  );
}
