import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectModal from "@/components/ProjectModal";
import { mockProject } from "@/test/fixtures";

describe("ProjectModal", () => {
  it("affiche les détails du projet lorsqu'il est ouvert", async () => {
    render(<ProjectModal project={mockProject} onClose={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    expect(screen.getByRole("heading", { name: mockProject.full_name })).toBeInTheDocument();
    expect(screen.getByText(mockProject.description_full)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Voir le dépôt GitHub" })).toHaveAttribute(
      "href",
      mockProject.github_link,
    );
  });

  it("appelle onClose au clic sur le bouton fermer", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(<ProjectModal project={mockProject} onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Fermer la modale" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("ne rend rien si aucun projet n'est sélectionné", () => {
    const { container } = render(<ProjectModal project={null} onClose={jest.fn()} />);

    expect(container).toBeEmptyDOMElement();
  });
});
