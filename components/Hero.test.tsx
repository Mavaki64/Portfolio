import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

describe("Hero", () => {
  it("affiche le titre principal et les liens d'action", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Killian GAYEZ" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Voir mes projets" })).toHaveAttribute(
      "href",
      "#Projects",
    );
    expect(screen.getByRole("link", { name: "Me contacter" })).toHaveAttribute(
      "href",
      "#Contact",
    );
  });
});
