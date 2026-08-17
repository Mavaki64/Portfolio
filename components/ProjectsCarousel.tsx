"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import ProjectCard, { type Project } from "@/components/ProjectCard";

const AUTOPLAY_MS = 4500;
const SLIDE_MS = 550;
const GAP_PX = 24;
const MD_BREAKPOINT = 768;

function useItemsPerView() {
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`);
    const sync = () => setItemsPerView(media.matches ? 3 : 1);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return itemsPerView;
}

export default function ProjectsCarousel({
  projects,
}: {
  projects: Project[];
}) {
  const itemsPerView = useItemsPerView();
  const containerRef = useRef<HTMLDivElement>(null);
  const cycle = projects.length;
  const indexRef = useRef(cycle);
  const itemWidthRef = useRef(0);
  const animatingRef = useRef(false);

  const [itemWidth, setItemWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const [page, setPage] = useState(cycle);
  const [isSliding, setIsSliding] = useState(false);

  const x = useMotionValue(0);
  const progress = useMotionValue(0);

  const loopCopies = Math.max(4, Math.ceil(8 / Math.max(cycle, 1)));
  const slides = Array.from({ length: cycle * loopCopies }, (_, i) => {
    const project = projects[i % cycle];
    return { project, key: `${project.id}-${i}` };
  });

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const width =
      (el.clientWidth - GAP_PX * (itemsPerView - 1)) / itemsPerView;
    itemWidthRef.current = width;
    setItemWidth(width);
    x.set(-indexRef.current * (width + GAP_PX));
  }, [itemsPerView, x]);

  useEffect(() => {
    measure();
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    indexRef.current = cycle;
    setPage(cycle);
    progress.set(0);
    if (itemWidthRef.current) {
      x.set(-cycle * (itemWidthRef.current + GAP_PX));
    }
  }, [cycle, itemsPerView, x, progress]);

  const goNext = useCallback(() => {
    if (animatingRef.current || !itemWidthRef.current) return;

    animatingRef.current = true;
    setIsSliding(true);
    progress.set(0);

    const step = itemWidthRef.current + GAP_PX;
    const next = indexRef.current + 1;

    animate(x, -next * step, {
      duration: SLIDE_MS / 1000,
      ease: [0.32, 0.72, 0, 1],
      onComplete: () => {
        let settled = next;
        if (settled >= cycle * 2) {
          settled = settled - cycle;
          x.set(-settled * step);
        }
        indexRef.current = settled;
        setPage(settled);
        animatingRef.current = false;
        setIsSliding(false);
      },
    });
  }, [cycle, x, progress]);

  useEffect(() => {
    if (paused || !itemWidth || isSliding) return;

    const remaining = Math.max(1 - progress.get(), 0);
    const duration = Math.max((remaining * AUTOPLAY_MS) / 1000, 0.05);

    const controls = animate(progress, 1, {
      duration,
      ease: "linear",
      onComplete: goNext,
    });

    return () => controls.stop();
  }, [paused, page, itemWidth, isSliding, goNext, progress]);

  return (
    <div
      className="mt-8 w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={containerRef} className="w-full overflow-hidden">
        <motion.div className="flex" style={{ x, gap: GAP_PX }}>
          {slides.map(({ project, key }) => (
            <div
              key={key}
              className="shrink-0"
              style={{
                width: itemWidth || undefined,
                flexBasis: itemWidth || undefined,
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
      </div>

      <div
        className="mx-auto mt-6 h-1 w-20 overflow-hidden rounded-full bg-foreground/10 md:w-24"
        aria-hidden
      >
        <motion.div
          className="h-full origin-left rounded-full bg-primary"
          style={{ scaleX: progress }}
        />
      </div>
    </div>
  );
}
