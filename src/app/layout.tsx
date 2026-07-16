import type { Metadata } from "next";
import Script from "next/script";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-W392VHP9ET";
const META_PIXEL_ID = "1564049268605554";

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="freego-google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="freego-meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}
