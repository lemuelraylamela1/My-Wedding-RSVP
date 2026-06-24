import type { Metadata } from "next";
import {
  Playfair_Display,
  Cinzel,
  Lora,
  DM_Sans,
} from "next/font/google";
import "./globals.css";
import { wedding } from "@/config/wedding";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel-var",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dm = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const title = `${wedding.couple.groom.first} & ${wedding.couple.bride.first} | Wedding Invitation`;
const description = `You are cordially invited to celebrate the wedding of ${wedding.couple.groom.full} & ${wedding.couple.bride.full} on ${wedding.event.dateLong} at ${wedding.event.venue.name}.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title,
  description,
  keywords: [
    "wedding",
    "RSVP",
    "invitation",
    wedding.couple.groom.full,
    wedding.couple.bride.full,
    wedding.event.venue.name,
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cinzel.variable} ${lora.variable} ${dm.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
