import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-full w-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-foreground/10 bg-surface p-8 sm:p-10">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 font-text text-sm text-foreground/80 outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Retour à l&apos;accueil
        </Link>

        <div className="space-y-4">
          <p className="font-title text-sm tracking-widest text-primary uppercase">
            Erreur 404
          </p>
          <h1 className="font-title text-3xl font-bold tracking-tight sm:text-4xl">
            Page non trouvée
          </h1>
          <p className="max-w-sm font-text text-base leading-relaxed text-foreground/70">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>
      </div>
    </div>
  );
}