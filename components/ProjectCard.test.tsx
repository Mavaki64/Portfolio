import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectCard from "@/components/ProjectCard";
import { mockProject } from "@/test/fixtures";

describe("ProjectCard", () => {
  it("affiche le nom et la description du projet", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByRole("heading", { name: mockProject.name })).toBeInTheDocument();
    expect(screen.getByText(mockProject.short_description)).toBeInTheDocument();
  });

  it("appelle onOpen au clic sur le bouton", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();

    render(<ProjectCard project={mockProject} onOpen={onOpen} />);

    await user.click(screen.getByRole("button", { name: "Voir le projet" }));

    expect(onOpen).toHaveBeenCalledWith(mockProject);
  });
});
