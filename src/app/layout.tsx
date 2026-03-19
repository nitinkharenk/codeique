import type { Metadata } from "next";
import { Anton, Geist, Space_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codeique.example"),
  title: {
    default: "Codeique",
    template: "%s | Codeique",
  },
  description:
    "Codeique is a premium design and development studio building brands, websites, and digital experiences with intention, clarity, and craft.",
  keywords: [
    "Codeique",
    "design studio",
    "web design",
    "development studio",
    "branding agency",
  ],
  openGraph: {
    title: "Codeique",
    description:
      "Beyond Code. Built with Craft. Premium websites, branding, and motion-rich digital experiences.",
    url: "https://codeique.example",
    siteName: "Codeique",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codeique",
    description:
      "Beyond Code. Built with Craft. Premium websites, branding, and motion-rich digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Codeique",
    url: "https://codeique.example",
    slogan: "Beyond Code. Built with Craft.",
    description:
      "Premium design and development studio for branding, websites, and digital experiences.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.linkedin.com",
      "https://www.instagram.com",
      "https://www.behance.net",
      "https://x.com",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} bg-[var(--color-background)] font-sans text-[var(--color-foreground)] antialiased`}
      >
        <div className="noise pointer-events-none fixed inset-0 z-50 opacity-30" />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  );
}
