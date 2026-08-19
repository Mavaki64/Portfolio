"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";

const ContactForm = React.lazy(() => import("@/components/ContactForm"));

export default function LazyContactForm() {
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
          <ContactForm />
        </Suspense>
      ) : null}
    </>
  );
}

