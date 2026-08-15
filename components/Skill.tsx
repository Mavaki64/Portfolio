import Image from "next/image";

export default function Skill({
  title,
  logo,
  alt,
}: {
  title: string;
  logo: string;
  alt: string;
}) {
  return (
    <article className="flex w-[110px] flex-col items-center gap-3 rounded-xl border border-foreground/10 bg-surface px-3 py-4">
      <Image
        src={logo}
        alt={alt}
        width={40}
        height={40}
        className="size-10 object-contain"
      />
      <h4 className="text-center font-text text-sm text-foreground">{title}</h4>
    </article>
  );
}

export function SoftSkill({ title }: { title: string }) {
  return (
    <article className="flex w-[110px] flex-col items-center justify-center rounded-xl border border-foreground/10 bg-surface px-3 py-4">
      <h4 className="text-center font-text text-sm text-foreground">{title}</h4>
    </article>
  );
}
