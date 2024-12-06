import dynamic from "next/dynamic";

import DemoSlider from "./ui/components/SliderSwiper";
import dataSlider from "@/app/_data/slider-data.json";
const InfoSection = dynamic(
  () => import("./ui/landing/InfoSection/InfoSection"),
  { ssr: false }
);
const PreviewSection = dynamic(
  () => import("./ui/landing/previewSection/PreviewSection"),
  { ssr: false }
);
const ServicesSection = dynamic(
  () => import("./ui/landing/servicesSection/ServicesSection"),
  { ssr: false }
);
const CompanySection = dynamic(
  () => import("./ui/landing/companySection/CompanySection"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <DemoSlider data={dataSlider} />

      <main className="relative">
        <PreviewSection />
        <ServicesSection />
        <InfoSection />
        <CompanySection />
      </main>
    </>
  );
}
