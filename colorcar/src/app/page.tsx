import CompanySection from "./ui/landing/companySection/CompanySection";
import InfoSection from "./ui/landing/InfoSection/InfoSection";
import PreviewSection from "./ui/landing/previewSection/PreviewSection";
import ServicesSection from "./ui/landing/servicesSection/ServicesSection";
import SwiperWrapper from "./ui/components/sliders/SwiperWrapper";
import NovetlyWrapper from "./ui/landing/newestSection/NovetlyWrapper";

export default async function Home() {
  return (
    <>
      <SwiperWrapper />
      <main className="relative">
        <PreviewSection />
        <ServicesSection />
        <NovetlyWrapper />
        <InfoSection />
        <CompanySection />
      </main>
    </>
  );
}
