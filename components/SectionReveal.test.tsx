import { render, screen } from "@testing-library/react";
import SectionReveal from "@/components/SectionReveal";

describe("SectionReveal", () => {
  it("affiche son contenu enfant", () => {
    render(
      <SectionReveal>
        <p>Contenu de section</p>
      </SectionReveal>,
    );

    expect(screen.getByText("Contenu de section")).toBeInTheDocument();
  });
});
