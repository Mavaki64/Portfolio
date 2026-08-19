import Image from "next/image";

export type Project = {
  id: number;
  name: string;
  full_name: string;
  short_description: string;
  mockup: string;
  stack_logos: string[];
  description_full: string;
  github_link: string;
};

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen?: (project: Project) => void;
}) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-foreground/10 bg-surface">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        <Image
          src={project.mockup}
          alt={`Aperçu du projet ${project.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-title text-lg font-semibold text-foreground">
          {project.name}
        </h3>
        <p className="flex-1 font-text text-sm leading-relaxed text-foreground/80">
          {project.short_description}
        </p>
        <button
          type="button"
          onClick={() => onOpen?.(project)}
          className="mt-auto w-full border border-primary bg-primary/20 px-4 py-2 text-center font-text text-sm text-foreground motion-safe:transition-[transform,background-color] motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:scale-[1.03] hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          Voir le projet
        </button>
      </div>
    </article>
  );
}
