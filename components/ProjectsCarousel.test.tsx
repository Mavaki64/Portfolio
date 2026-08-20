import { render, screen, waitFor } from "@testing-library/react";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { mockProject } from "@/test/fixtures";

describe("ProjectsCarousel", () => {
  it("affiche les projets et la navigation du carousel", async () => {
    render(<ProjectsCarousel projects={[mockProject]} />);

    await waitFor(() => {
      expect(
        screen.getAllByRole("heading", { name: mockProject.name }).length,
      ).toBeGreaterThan(0);
    });

    expect(
      screen.getByRole("group", { name: "Navigation du carousel de projets" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Projet précédent" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Projet suivant" })).toBeInTheDocument();
  });
});
