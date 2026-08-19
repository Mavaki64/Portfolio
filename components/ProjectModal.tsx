"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import type { Project } from "@/components/ProjectCard";
import { useFocusTrap } from "@/components/useFocusTrap";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const main = document.querySelector("main");
    const navs = Array.from(document.querySelectorAll("nav"));
    main?.setAttribute("inert", "");
    navs.forEach((nav) => nav.setAttribute("inert", ""));

    return () => {
      window.cancelAnimationFrame(frame);
      main?.removeAttribute("inert");
      navs.forEach((nav) => nav.removeAttribute("inert"));
      previouslyFocused.current?.focus();
    };
  }, [project, onClose]);

  useFocusTrap(Boolean(project), dialogRef, onClose);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          role="presentation"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 lg:p-5"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
          onWheel={(event) => event.stopPropagation()}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div
            className="absolute inset-0 bg-background/80"
            aria-hidden
            onMouseDown={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{
              duration: reduceMotion ? 0.01 : 0.22,
              ease: [0.32, 0.72, 0, 1],
            }}
            tabIndex={-1}
            className="relative z-10 flex max-h-full w-full max-w-[900px] flex-col overflow-hidden rounded-xl border border-foreground/10 bg-surface"
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Fermer la modale"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 rounded-lg border-2 border-foreground bg-surface/90 p-1 text-foreground outline-none transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>

            <div className="modal-scroll min-h-0 overflow-y-auto">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
                <Image
                  src={project.mockup}
                  alt={`Mockup du projet ${project.name}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                  className="object-cover object-top"
                  priority
                />
                {project.stack_logos.length > 0 && (
                  <ul className="absolute bottom-3 left-3 flex items-center gap-4">
                    {project.stack_logos.map((src, index) => (
                      <li
                        key={`${src}-${index}`}
                        className="relative size-8 overflow-hidden sm:size-12"
                        style={{ marginLeft: index === 0 ? 0 : -8 }}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <h2
                  id={titleId}
                  className="pr-10 font-title text-xl font-semibold text-foreground sm:text-2xl"
                >
                  {project.full_name}
                </h2>
                <p className="font-text text-sm leading-relaxed text-foreground/80 sm:text-base">
                  {project.description_full}
                </p>

                {project.github_link ? (
                  <div className="mt-2 rounded-lg border border-foreground/10 bg-background/60 p-4">
                    <h3 className="font-title text-sm font-semibold text-foreground">
                      Liens et ressources
                    </h3>
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    className="mt-2 inline-flex font-text text-sm text-primary underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      Voir le dépôt GitHub
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
