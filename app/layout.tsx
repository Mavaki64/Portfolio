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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Portfolio de Killian GAYEZ, développeur web front-end.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: "Portfolio de Killian GAYEZ, développeur web front-end.",
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: "Portfolio de Killian GAYEZ, développeur web front-end.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${interFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Nav />
        <main className="flex flex-col flex-1 items-center justify-center lg:pl-64">
          {children}
        </main>
      </body>
    </html>
  );
}
