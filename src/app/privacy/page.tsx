import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StatusPage } from "@/components/ui/StatusPage";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <StatusPage
          eyebrow="(COMING SOON)"
          title="Privacy Policy"
          description="This page is being prepared right now. If you need policy details before it goes live, contact us and we will share them directly."
        />
      </main>
      <Footer />
    </>
  );
}
