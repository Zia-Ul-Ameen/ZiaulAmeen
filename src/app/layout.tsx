import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ziaul-ameen.vercel.app/"),
  title: "Ziaul Ameen | Full-Stack Developer",
  description: "Portfolio of Ziaul Ameen, a Bangalore-based full-stack developer specializing in high-performance web applications using React, Next.js, and NestJS.",
  keywords: ["Ziaul Ameen", "Full-Stack Developer", "Next.js Portfolio", "React Developer", "Bangalore Developer"],
  openGraph: {
    title: "Ziaul Ameen | Full-Stack Developer",
    description: "Visual portfolio and engineering expertise of Ziaul Ameen.",
    url: "https://ziaul-ameen.vercel.app/",
    siteName: "Ziaul Ameen Portfolio",
    images: [
      {
        url: "/og-image.png", // User should provide this
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziaul Ameen | Full-Stack Developer",
    description: "Visual portfolio and engineering expertise of Ziaul Ameen.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased selection:bg-[#F2C94C] selection:text-black`}
    >
      <body className="flex flex-col font-sans bg-[#0a0a0a]">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
