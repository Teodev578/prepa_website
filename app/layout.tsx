import type { Metadata } from "next";
import { Poppins, IBM_Plex_Mono, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MotionConfig } from "framer-motion";

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lawcleancenter.com'),
  title: {
    default: "Law Clean Center | Préparation Esthétique & Convoyage de Véhicules B2B",
    template: "%s | Law Clean Center"
  },
  description: "Externalisez la préparation esthétique VN/VO et le convoyage de vos véhicules en Île-de-France. Solutions de logistique et de nettoyage esthétique sur-mesure pour professionnels.",
  keywords: [
    "Law Clean Center",
    "préparateur esthétique auto B2B",
    "convoyage véhicule Île-de-France",
    "nettoyage professionnel véhicule",
    "externalisation pôle préparation auto",
    "flotte automobile",
    "VN VO",
    "détailing B2B concessionnaire"
  ],
  authors: [{ name: "Law Clean Center", url: "https://lawcleancenter.com" }],
  creator: "Law Clean Center",
  publisher: "Law Clean Center",
  category: "business",
  alternates: {
    canonical: "https://lawcleancenter.com",
  },
  openGraph: {
    title: "Law Clean Center | Préparation Esthétique & Convoyage Automobile B2B",
    description: "Externalisez la préparation esthétique VN/VO et le convoyage de vos véhicules en Île-de-France. Solutions de logistique et de nettoyage esthétique sur-mesure pour professionnels.",
    url: "https://lawcleancenter.com",
    siteName: "Law Clean Center",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Law Clean Center - Préparation esthétique et convoyage de véhicules pour professionnels en Île-de-France",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Clean Center | Préparation Esthétique & Convoyage B2B Île-de-France",
    description: "Externalisez la préparation esthétique et le convoyage de vos véhicules. Solutions B2B sur-mesure en Île-de-France.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Script inline pour appliquer le thème avant hydration (évite le flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <MotionConfig transition={{ ease: [0.16, 1, 0.3, 1] }}>
            {children}
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
