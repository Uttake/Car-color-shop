import CompanySection from "./ui/landing/companySection/CompanySection";
import InfoSection from "./ui/landing/InfoSection/InfoSection";
import PreviewSection from "./ui/landing/previewSection/PreviewSection";
import ServicesSection from "./ui/landing/servicesSection/ServicesSection";
import SwiperWrapper from "./ui/components/sliders/SwiperWrapper";
import NovetlyWrapper from "./ui/landing/newestSection/NovetlyWrapper";
import AnimatedBlock from "./ui/components/animatedBlock/AnimatedBlock";

export default async function Home() {
  return (
    <>
      <SwiperWrapper />
      <main className="relative">
        <PreviewSection />
        <AnimatedBlock>
          <ServicesSection />
        </AnimatedBlock>
        <AnimatedBlock>
          <NovetlyWrapper />
        </AnimatedBlock>
        <AnimatedBlock>
          <InfoSection />
        </AnimatedBlock>
        <AnimatedBlock>
          <CompanySection />
        </AnimatedBlock>
      </main>
    </>
  );
}
