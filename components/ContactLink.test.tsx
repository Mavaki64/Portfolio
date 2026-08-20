import { render, screen } from "@testing-library/react";
import ContactLink from "@/components/ContactLink";

describe("ContactLink", () => {
  it("affiche un lien externe avec le bon label accessible", () => {
    render(
      <ContactLink
        href="https://github.com/Mavaki64"
        label="GitHub"
        src="/contact/Github.svg"
      />,
    );

    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("href", "https://github.com/Mavaki64");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("affiche un texte lorsqu'aucune image n'est fournie", () => {
    render(
      <ContactLink
        href="mailto:killian@example.com"
        label="Envoyer un email"
        text="@"
      />,
    );

    expect(screen.getByText("@")).toBeInTheDocument();
  });
});
