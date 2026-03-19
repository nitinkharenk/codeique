import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StatusPage } from "@/components/ui/StatusPage";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <StatusPage
          eyebrow="(COMING SOON)"
          title="Terms of Service"
          description="This page is not published yet. Reach out if you need the current terms before the public version is available."
        />
      </main>
      <Footer />
    </>
  );
}
