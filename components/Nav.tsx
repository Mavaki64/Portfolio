"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  House,
  UserRound,
  CodeXml,
  Folder,
  BriefcaseBusiness,
  Mail,
  X,
  Menu,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useFocusTrap } from "@/components/useFocusTrap";

const items: {
  id: string;
  href: string;
  Icon: LucideIcon;
  label: string;
}[] = [
  { id: "Home", href: "/#Home", Icon: House, label: "Accueil" },
  { id: "About", href: "/#About", Icon: UserRound, label: "À propos" },
  { id: "Skills", href: "/#Skills", Icon: CodeXml, label: "Compétences" },
  { id: "Projects", href: "/#Projects", Icon: Folder, label: "Projets" },
  {
    id: "Parcours",
    href: "/#Parcours",
    Icon: BriefcaseBusiness,
    label: "Parcours",
  },
  { id: "Contact", href: "/#Contact", Icon: Mail, label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("Home");
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onHash = () => setActive(window.location.hash.slice(1) || "Home");
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const nextActive = entries
          .filter(
            (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.8,
          )
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (nextActive?.target.id) {
          setActive(nextActive.target.id);

          const nextHash = `#${nextActive.target.id}`;
          if (window.location.hash !== nextHash) {
            window.history.replaceState(null, "", nextHash);
          }
        }
      },
      {
        threshold: [0.8, 0.9, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(frame);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    if (isOpen) {
      main.setAttribute("inert", "");
      return () => main.removeAttribute("inert");
    }

    main.removeAttribute("inert");
  }, [isOpen]);

  useFocusTrap(isOpen, mobileMenuRef, () => setIsOpen(false));

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setIsOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const buttonClassName =
    "text-2xl border-2 border-foreground rounded-xl hover:border-primary hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  return (
    <>
      {/* Mobile / tablette */}
      <div className="lg:hidden">
        {!isOpen && (
          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}
            aria-controls="main-nav-mobile"
            className={`fixed top-4 right-4 z-20 p-1 ${buttonClassName}`}
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-8 h-8" strokeWidth={1} />
          </button>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              ref={mobileMenuRef}
              id="main-nav-mobile"
              key="nav-mobile"
              initial={reduceMotion ? false : { x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { x: "100%", opacity: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0.01 }
                  : { type: "spring", stiffness: 320, damping: 32 }
              }
              tabIndex={-1}
              className="bg-surface w-full h-screen fixed inset-0 z-10 font-inter"
            >
              <div className="flex justify-end w-full p-4">
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Fermer le menu"
                  className={buttonClassName}
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-10 h-10" strokeWidth={1} />
                </button>
              </div>
              <ul className="flex flex-col justify-center h-full">
                {items.map(({ id, label, href, Icon }) => (
                  <li
                    key={id}
                    className={active === id ? "bg-primary/20" : undefined}
                  >
                    <Link
                      href={href}
                      onClick={() => {
                        setActive(id);
                        setIsOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 px-2 py-4 text-xl outline-none hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      <Icon className="w-12 h-12" strokeWidth={1} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop — sidebar */}
      <nav
        aria-label="Navigation principale"
        className="hidden lg:flex fixed inset-y-0 left-0 z-10 w-64 flex-col bg-surface font-inter border-r border-foreground/10"
      >
        <div className="flex shrink-0 items-center justify-center px-6 pt-8 pb-16">
          <Link
            href="#Home"
            onClick={() => setActive("Home")}
            aria-label="Accueil"
            className="outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Image
              src="/logo.svg"
              alt="Logo Killian Gayez"
              width={120}
              height={80}
              priority
              className="h-auto w-28"
            />
          </Link>
        </div>
        <ul className="flex flex-col pt-16 pb-8">
          {items.map(({ id, label, href, Icon }) => {
            const isActive = active === id;
            return (
              <li key={id} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-active"
                    className="absolute inset-y-0 left-0 w-1 bg-primary"
                    transition={
                      reduceMotion
                        ? { duration: 0.01 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                  />
                )}
                <Link
                  href={href}
                  onClick={() => setActive(id)}
                  aria-current={isActive ? "page" : undefined}
                  className="relative z-10 flex items-center gap-3 px-6 py-3 text-base text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <Icon className="w-6 h-6 shrink-0" strokeWidth={1.5} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
