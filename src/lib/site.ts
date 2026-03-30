export const siteConfig = {
  name: "Codeique",
  url: "https://codeique.studio",
  email: "hello@codeique.studio",
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  location: "New Delhi, India",
  description:
    "Codeique is a premium design and development studio building brands, websites, and digital experiences with intention, clarity, and craft.",
  tagline: "Beyond Code. Built with Craft.",
  ogImage: "/opengraph-image",
} as const;

export const socialProfiles = [
  { href: "https://x.com/codeique_studio", label: "X / Twitter" },
  { href: "https://www.instagram.com/codeique.studio/", label: "Instagram" },
  {
    href: "https://www.linkedin.com/company/codeique-studio/",
    label: "LinkedIn",
  },
  { href: "https://www.behance.net/codeique", label: "Behance" },
] as const;

export const legalNavigation = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;
