"use client";

const fieldClassName =
  "rounded-lg border border-foreground/10 bg-surface px-4 py-2.5 font-text text-foreground outline-none transition-colors hover:border-foreground/25 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40";

export default function ContactForm() {
  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="font-text text-sm">
          Nom
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
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
          className={`resize-y ${fieldClassName}`}
        />
      </div>
      <button
        type="submit"
        className="mt-2 w-full border border-primary bg-primary/20 px-4 py-2.5 font-text text-foreground transition-colors hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
      >
        Envoyer
      </button>
    </form>
  );
}
