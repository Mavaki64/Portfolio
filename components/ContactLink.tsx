import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ContactLinkProps = {
  href: string;
  label: string;
  src?: string;
  icon?: LucideIcon;
  text?: string;
};

export default function ContactLink({
  href,
  label,
  src,
  icon: Icon,
  text,
}: ContactLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex size-24 items-center justify-center rounded-full border border-foreground/10 bg-surface text-primary outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={48}
          height={48}
          className="size-12 object-contain"
        />
      ) : Icon ? (
        <Icon className="size-12" strokeWidth={1.5} aria-hidden />
      ) : (
        <span className="font-title text-5xl leading-none">
          {text}
        </span>
      )}
    </Link>
  );
}
