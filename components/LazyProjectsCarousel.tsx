"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/components/ProjectCard";

const ProjectsCarousel = React.lazy(
  () => import("@/components/ProjectsCarousel"),
);

export default function LazyProjectsCarousel({
  projects,
}: {
  projects: Project[];
}) {
  const [inView, setInView] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        // Déclenche avant d'être réellement “au milieu” de l'écran
        rootMargin: "600px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  const fallback = useMemo(() => null, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden />
      {inView ? (
        <Suspense fallback={fallback}>
          <ProjectsCarousel projects={projects} />
        </Suspense>
      ) : null}
    </>
  );
}

