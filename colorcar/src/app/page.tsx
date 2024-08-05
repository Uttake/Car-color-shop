import DemoSlider from "./ui/components/SliderSwiper";
import Header from "./ui/header/Header";
import InfoSection from "./ui/landing/InfoSection/InfoSection";

import dataSlider from "@/app/_data/slider-data.json";
import PreviewSection from "./ui/landing/previewSection/PreviewSection";
import ServicesSection from "./ui/landing/servicesSection/ServicesSection";

export default function Home() {
  return (
    <>
      <Header />
      <main >
        <div>
          <DemoSlider data={dataSlider} />
        </div>
        <InfoSection />
        <PreviewSection/>
        <ServicesSection/>
      </main>
    </>
  );
}
