"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useReducedMotion } from "motion/react";

const fieldClassName =
  "rounded-lg border border-foreground/10 bg-surface px-4 py-2.5 font-text text-foreground outline-none transition-colors hover:border-foreground/25 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-60";

function errorMessageForStatus(status: number) {
  if (status === 400) {
    return "Certains champs sont incomplets ou invalides. Merci de les vérifier.";
  }
  if (status === 429) {
    return "Trop de messages ont été envoyés. Merci de patienter quelques minutes avant de réessayer.";
  }
  if (status >= 500) {
    return "L’envoi n’a pas abouti. Merci de réessayer dans un instant.";
  }
  return "Votre message n’a pas pu être envoyé. Merci de réessayer plus tard.";
}

export default function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean }
        | null;

      if (response.status !== 200 || !payload?.ok) {
        setStatus("error");
        setError(errorMessageForStatus(response.status));
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Impossible de contacter le serveur. Merci de vérifier votre connexion, puis de réessayer.");
    }
  }

  const disabled = status === "loading";

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={onSubmit} noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="contact-website">Site web</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="font-text text-sm">
          Nom
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          disabled={disabled}
          className={fieldClassName}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="font-text text-sm">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={120}
          disabled={disabled}
          className={fieldClassName}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="font-text text-sm">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={2000}
          disabled={disabled}
          className={`resize-y ${fieldClassName}`}
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        aria-busy={disabled}
        className="mt-2 inline-flex w-full min-w-36 items-center justify-center gap-2 border border-primary bg-primary/20 px-4 py-2.5 font-text text-foreground transition-colors hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {disabled ? (
          <>
            <Loader2
              className={`size-4 ${reduceMotion ? "" : "animate-spin"}`}
              aria-hidden
            />
            Envoi…
          </>
        ) : (
          "Envoyer"
        )}
      </button>
      {status === "success" && (
        <p
          role="status"
          aria-live="polite"
          className="rounded-lg border border-primary/40 bg-primary/15 px-4 py-3 font-text text-sm text-foreground"
        >
          Votre message a bien été envoyé. Merci, je vous répondrai rapidement.
        </p>
      )}
      {status === "error" && error && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 font-text text-sm text-red-300"
        >
          {error}
        </p>
      )}
    </form>
  );
}
