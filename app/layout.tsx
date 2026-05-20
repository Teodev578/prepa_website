import type { Metadata } from "next";
import { Poppins, IBM_Plex_Mono, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  title: "Law Clean Center | Préparation Esthétique & Convoyage de Véhicules B2B",
  description: "Externalisez la préparation esthétique VN/VO et le convoyage de vos véhicules en Île-de-France. Solutions de logistique et de nettoyage esthétique sur-mesure pour professionnels.",
  keywords: [
    "Law Clean Center",
    "préparateur esthétique auto B2B",
    "convoyage véhicule Île-de-France",
    "nettoyage professionnel véhicule",
    "externalisation pôle préparation auto",
    "flotte automobile",
    "VN VO"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
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
        className={`${sans.variable} ${mono.variable} ${serif.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
