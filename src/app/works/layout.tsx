import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Selected work from Codeique covering brand, website, and digital product projects for founders and growing teams.",
  alternates: {
    canonical: "/works",
  },
};

export default function WorksLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
