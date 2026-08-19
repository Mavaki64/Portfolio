import FormData from "form-data";
import Mailgun from "mailgun.js";

function getClient() {
  const key = process.env.NEXT_PRIVATE_MAILGUN_API_KEY;
  const domain = process.env.NEXT_PRIVATE_MAILGUN_DOMAIN;

  if (!key || !domain) {
    throw new Error("Mailgun n’est pas configuré.");
  }

  const mailgun = new Mailgun(FormData);
  const client = mailgun.client({
    username: "api",
    key,
    url: process.env.NEXT_PRIVATE_MAILGUN_URL ?? "https://api.eu.mailgun.net",
  });

  return { client, domain };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const { client, domain } = getClient();
  const to = process.env.NEXT_PRIVATE_CONTACT_TO ?? "killiangayez@gmail.com";
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  await client.messages.create(domain, {
    from: `Portfolio <postmaster@${domain}>`,
    to: [`Killian GAYEZ <${to}>`],
    "h:Reply-To": email,
    subject: `Nouveau message de ${name}`,
    text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
    html: `<p><strong>Nom :</strong> ${safeName}</p>
<p><strong>Email :</strong> ${safeEmail}</p>
<p>${safeMessage}</p>`,
  });
}
