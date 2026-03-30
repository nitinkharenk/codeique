import type { Metadata } from "next";
import { Anton, Geist, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { siteConfig, socialProfiles } from "@/lib/site";

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.name,
    "design studio",
    "web design",
    "development studio",
    "branding agency",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.name,
    description: `${siteConfig.tagline} Premium websites, branding, and motion-rich digital experiences.`,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} social preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: `${siteConfig.tagline} Premium websites, branding, and motion-rich digital experiences.`,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (function() {
      try {
        var savedTheme = window.localStorage.getItem("codeique-theme");
        var theme = savedTheme === "light" ? "light" : "dark";
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = "dark";
        document.documentElement.style.colorScheme = "dark";
      }
    })();
  `;

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "New Delhi",
    },
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: socialProfiles.map((profile) => profile.href),
  };

  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-theme="dark"
      suppressHydrationWarning
    >
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} bg-[var(--color-background)] font-sans text-[var(--color-foreground)] antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Noise texture overlay — premium grain feel */}
        <div className="noise pointer-events-none fixed inset-0 z-50 opacity-30" />
        <Providers>
          {children}
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  );
}
