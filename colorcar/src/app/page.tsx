import DemoSlider from "./ui/components/SliderSwiper";
import InfoSection from "./ui/landing/InfoSection/InfoSection";

import dataSlider from "@/app/_data/slider-data.json";
import PreviewSection from "./ui/landing/previewSection/PreviewSection";
import ServicesSection from "./ui/landing/servicesSection/ServicesSection";
import CompanySection from "./ui/landing/companySection/CompanySection";

export default function Home() {
  return (
    <>
      <main>
        <div>
          <DemoSlider data={dataSlider} />
        </div>
        <InfoSection />
        <PreviewSection />
        <ServicesSection />
        <CompanySection />
      </main>
    </>
  );
}
