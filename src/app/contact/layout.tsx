import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Codeique. Share your goals and we'll come back with a direction that feels focused and realistic.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
