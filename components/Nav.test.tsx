import { render, screen } from "@testing-library/react";
import Nav from "@/components/Nav";

describe("Nav", () => {
  it("affiche la navigation principale sur desktop", () => {
    render(<Nav />);

    expect(
      screen.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projets" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Compétences" })).toBeInTheDocument();
  });
});
