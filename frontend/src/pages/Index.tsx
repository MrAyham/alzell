import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { CTA } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";

const Index = () => {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto">
        <Hero />
      </div>
      <div className="max-w-7xl mx-auto">
        <About />
      </div>
      <div className="max-w-7xl mx-auto">
        <Services />
      </div>
      <div className="max-w-7xl mx-auto">
        <CTA />
      </div>
      <div className="max-w-7xl mx-auto">
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default Index;
