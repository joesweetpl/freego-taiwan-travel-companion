import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreeGO Taiwan Travel Companion｜台灣旅遊陪伴者",
  description:
    "FreeGO connects travelers with local Taiwan Travel Companions who help plan personalized trips, recommend food and stays, and provide comfortable private travel across Taiwan with a 300+ Mercedes-Benz fleet.",
  keywords: [
    "Taiwan travel companion",
    "Taiwan private tour",
    "Taiwan local guide",
    "Taiwan travel planning",
    "Taiwan private driver",
    "Mercedes charter Taiwan",
    "台灣旅遊陪伴者",
    "台灣包車旅遊",
    "台灣自由行規劃",
    "賓士包車"
  ],
  openGraph: {
    title: "FreeGO Taiwan Travel Companion｜台灣旅遊陪伴者",
    description:
      "Experience Taiwan with a local friend. Personalized planning, multilingual companions, and a 300+ Mercedes-Benz fleet.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
