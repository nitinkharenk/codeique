import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Codeique is a design and development studio for founders and growing brands. We build digital presence that feels precise, considered, and commercially sharp.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
