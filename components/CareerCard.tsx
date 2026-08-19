export type CareerCardProps = {
  type: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  orientation: "left" | "right";
};

export default function CareerCard({
  type,
  title,
  description,
  date,
  location,
  orientation,
}: CareerCardProps) {
  const isLeft = orientation === "left";

  return (
    <div
      className={`flex w-full items-center ${
        isLeft ? "flex-row md:flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        aria-hidden
        className={`flex shrink-0 items-center ${
          isLeft ? "flex-row md:flex-row-reverse" : "flex-row"
        }`}
      >
        <span className="size-3 shrink-0 rounded-full border-2 border-primary bg-background" />
        <span className="h-px w-5 bg-foreground/20 sm:w-7" />
      </div>

      <article className="min-w-0 flex-1 rounded-xl border border-foreground/10 bg-surface p-4 motion-safe:transition-[transform,border-color] motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:scale-[1.015] hover:border-primary/70">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="font-title text-xs font-semibold tracking-wide text-primary uppercase">
            {type}
          </p>
          <p className="font-text text-xs text-foreground/60">{date}</p>
        </div>
        <h3 className="mt-2 font-title text-base font-semibold text-foreground">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 font-text text-xs leading-relaxed text-foreground/70">
            {description}
          </p>
        ) : null}
        <p className="mt-2 font-text text-sm text-foreground/80">{location}</p>
      </article>
    </div>
  );
}
