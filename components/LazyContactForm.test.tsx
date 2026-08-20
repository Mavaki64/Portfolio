import { render, screen, waitFor } from "@testing-library/react";
import LazyContactForm from "@/components/LazyContactForm";

describe("LazyContactForm", () => {
  it("charge le formulaire de contact à l'approche de la section", async () => {
    render(<LazyContactForm />);

    await waitFor(() => {
      expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: "Envoyer" })).toBeInTheDocument();
  });
});
