import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche les champs du formulaire avec leurs labels", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Envoyer" }),
    ).toBeInTheDocument();
  });

  it("affiche un message de succès après un envoi réussi", async () => {
    const user = userEvent.setup();

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: async () => ({ ok: true }),
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nom"), "Killian Gayez");
    await user.type(screen.getByLabelText("Email"), "killian@example.com");
    await user.type(
      screen.getByLabelText("Message"),
      "Bonjour, je souhaite échanger avec vous.",
    );
    await user.click(screen.getByRole("button", { name: "Envoyer" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Votre message a bien été envoyé. Merci, je vous répondrai rapidement.",
        ),
      ).toBeInTheDocument();
    });
  });

  it("affiche un message d'erreur lisible en cas d'échec API", async () => {
    const user = userEvent.setup();

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 400,
      json: async () => ({ ok: false }),
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nom"), "Killian Gayez");
    await user.type(screen.getByLabelText("Email"), "killian@example.com");
    await user.type(
      screen.getByLabelText("Message"),
      "Bonjour, je souhaite échanger avec vous.",
    );
    await user.click(screen.getByRole("button", { name: "Envoyer" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Certains champs sont incomplets ou invalides. Merci de les vérifier.",
        ),
      ).toBeInTheDocument();
    });
  });
});
