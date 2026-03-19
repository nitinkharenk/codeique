import dynamic from "next/dynamic";
import { headers } from "next/headers";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { detectPricingGeo } from "@/lib/pricing-geo";

const Work = dynamic(() =>
  import("@/components/sections/Work").then((mod) => mod.Work),
);
const Stats = dynamic(() =>
  import("@/components/sections/Stats").then((mod) => mod.Stats),
);
const Services = dynamic(() =>
  import("@/components/sections/Services").then((mod) => mod.Services),
);
const Process = dynamic(() =>
  import("@/components/sections/Process").then((mod) => mod.Process),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((mod) => mod.Testimonials),
);
const Pricing = dynamic(() =>
  import("@/components/sections/Pricing").then((mod) => mod.Pricing),
);
const FAQ = dynamic(() =>
  import("@/components/sections/FAQ").then((mod) => mod.FAQ),
);
const BlogPreview = dynamic(() =>
  import("@/components/sections/BlogPreview").then((mod) => mod.BlogPreview),
);
const CTA = dynamic(() =>
  import("@/components/sections/CTA").then((mod) => mod.CTA),
);

export default async function Home() {
  const requestHeaders = await headers();
  const pricingGeo = detectPricingGeo(requestHeaders);

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <Hero />
        <About />
        <Work />
        <Stats />
        <Services />
        <Process />
        <Testimonials />
        <Pricing initialCountry={pricingGeo.country} initialLocale={pricingGeo.locale} />
        <FAQ />
        <BlogPreview />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
