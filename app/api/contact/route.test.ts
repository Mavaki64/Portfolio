/**
 * @jest-environment node
 */
jest.mock("../../../lib/mailgun", () => ({
  sendContactEmail: jest.fn(),
}));

import { NextRequest } from "next/server";
import { POST } from "./route";
import { sendContactEmail } from "@/lib/mailgun";

const mockedSendContactEmail = sendContactEmail as jest.MockedFunction<
  typeof sendContactEmail
>;

function createRequest(
  body: unknown,
  headers: Record<string, string> = {},
) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `test-ip-${Math.random()}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Killian Gayez",
  email: "killian@example.com",
  message: "Bonjour, je souhaite échanger avec vous.",
  website: "",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    mockedSendContactEmail.mockReset();
    mockedSendContactEmail.mockResolvedValue(undefined);
  });

  it("retourne 400 si le JSON est invalide", async () => {
    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ invalid",
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
  });

  it("retourne 400 si des champs obligatoires manquent", async () => {
    const response = await POST(createRequest({ name: "Killian" }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Tous les champs sont requis.");
  });

  it("retourne 400 si l'email est invalide", async () => {
    const response = await POST(
      createRequest({
        ...validPayload,
        email: "email-invalide",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("L’adresse email est invalide.");
  });

  it("accepte silencieusement le honeypot rempli", async () => {
    const response = await POST(
      createRequest({
        ...validPayload,
        website: "https://spam.example",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(mockedSendContactEmail).not.toHaveBeenCalled();
  });

  it("envoie l'email et retourne 200 pour une requête valide", async () => {
    const response = await POST(createRequest(validPayload));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(mockedSendContactEmail).toHaveBeenCalledWith({
      name: "Killian Gayez",
      email: "killian@example.com",
      message: "Bonjour, je souhaite échanger avec vous.",
    });
  });

  it("retourne 502 si Mailgun échoue", async () => {
    mockedSendContactEmail.mockRejectedValue(new Error("Mailgun down"));

    const response = await POST(createRequest(validPayload));
    const data = await response.json();

    expect(response.status).toBe(502);
    expect(data.error).toBe(
      "L’envoi n’a pas abouti. Merci de réessayer dans un instant.",
    );
  });
});
