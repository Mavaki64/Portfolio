import { render, screen } from "@testing-library/react";
import CareerCard from "@/components/CareerCard";

describe("CareerCard", () => {
  it("affiche le type, le titre et le lieu", () => {
    render(
      <CareerCard
        type="Formation"
        title="Intégrateur web"
        description="Titre RNCP38145"
        date="2025 - 2026"
        location="OpenClassrooms"
        orientation="left"
      />,
    );

    expect(screen.getByText("Formation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Intégrateur web" })).toBeInTheDocument();
    expect(screen.getByText("OpenClassrooms")).toBeInTheDocument();
    expect(screen.getByText("Titre RNCP38145")).toBeInTheDocument();
  });

  it("n'affiche pas la description si elle est nulle", () => {
    render(
      <CareerCard
        type="Expérience"
        title="Développeur web"
        description={null}
        date="2025 - aujourd'hui"
        location="Insaity"
        orientation="right"
      />,
    );

    expect(screen.getByText("Expérience")).toBeInTheDocument();
    expect(screen.queryByText("null")).not.toBeInTheDocument();
  });
});
