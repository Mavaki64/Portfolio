import { render, screen, waitFor } from "@testing-library/react";
import LazyProjectsCarousel from "@/components/LazyProjectsCarousel";
import { mockProject } from "@/test/fixtures";

describe("LazyProjectsCarousel", () => {
  it("charge le carousel à l'approche de la section", async () => {
    render(<LazyProjectsCarousel projects={[mockProject]} />);

    await waitFor(() => {
      expect(
        screen.getAllByRole("heading", { name: mockProject.name }).length,
      ).toBeGreaterThan(0);
    });
  });
});
