import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/mailgun";

export const runtime = "nodejs";

const NAME_MAX = 80;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function jsonError(message: string, status: number, retryAfterSeconds?: number) {
  const headers = retryAfterSeconds
    ? { "Retry-After": String(retryAfterSeconds) }
    : undefined;
  return NextResponse.json({ ok: false, error: message }, { status, headers });
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return jsonError(
      "Trop de messages ont été envoyés. Merci de patienter quelques minutes avant de réessayer.",
      429,
      limited.retryAfterSeconds,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Requête invalide.", 400);
  }

  if (!body || typeof body !== "object") {
    return jsonError("Requête invalide.", 400);
  }

  const { name, email, message, website } = body as Record<string, unknown>;

  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return jsonError("Tous les champs sont requis.", 400);
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length < 2 || trimmedName.length > NAME_MAX) {
    return jsonError("Le nom est invalide.", 400);
  }

  if (!EMAIL_PATTERN.test(trimmedEmail) || trimmedEmail.length > 120) {
    return jsonError("L’adresse email est invalide.", 400);
  }

  if (trimmedMessage.length < MESSAGE_MIN || trimmedMessage.length > MESSAGE_MAX) {
    return jsonError("Le message doit faire entre 10 et 2000 caractères.", 400);
  }

  try {
    await sendContactEmail({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form Mailgun error:", error);
    return jsonError("L’envoi n’a pas abouti. Merci de réessayer dans un instant.", 502);
  }
}
