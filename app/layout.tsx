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

const metaTitle = `${appName} - Développeur front-end junior (React/Next.js)`;

const metaDescription =
  "Portfolio de Killian Gayez, développeur front-end junior. React & Next.js, accessibilité, performance et interfaces UI soignées. Découvrez mes projets et mon parcours.";

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
        alt: "Portfolio Killian Gayez",
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
