import { render, screen } from "@testing-library/react";
import Skill, { SoftSkill } from "@/components/Skill";

describe("Skill", () => {
  it("affiche le titre de la compétence technique", () => {
    render(<Skill title="React" logo="/skills/react.svg" alt="React" />);

    expect(screen.getByRole("heading", { name: "React" })).toBeInTheDocument();
  });
});

describe("SoftSkill", () => {
  it("affiche le titre de la soft skill", () => {
    render(<SoftSkill title="Autonomie" />);

    expect(screen.getByRole("heading", { name: "Autonomie" })).toBeInTheDocument();
  });
});
