import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Portfolio - Killian GAYEZ";

const metaTitle =
  "Développeur front-end junior (React) à Hendaye & Pays Basque | Killian Gayez";

const metaDescription =
  "Développeur front-end junior au Pays Basque (Hendaye, Bayonne, Biarritz). Je conçois des applications web interactives et des pages réactives avec React/Next.js, Git/GitHub, API et tests unitaires.";

const socialImageAlt =
  "Killian Gayez - Développeur front-end junior React/Next.js au Pays Basque";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: metaTitle,
  description: metaDescription,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: appName,
    title: metaTitle,
    description: metaDescription,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${interFont.variable} h-full antialiased scroll-smooth`}
    >
      <body className="bg-background text-foreground">
        <Nav />
        <main className="min-h-full flex-1 bg-background lg:pl-64">
          <div className="flex min-h-full flex-col items-center justify-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
