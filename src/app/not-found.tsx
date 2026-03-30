import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StatusPage } from "@/components/ui/StatusPage";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative overflow-hidden">
        <StatusPage
          eyebrow="(404)"
          title="Page Not Found"
          description="The page you opened does not exist or may have moved. Use the links below to return home or contact us and we will point you in the right direction."
        />
      </main>
      <Footer />
    </>
  );
}
