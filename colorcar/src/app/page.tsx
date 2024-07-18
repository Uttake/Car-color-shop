import Header from "./ui/header/Header";
import InfoSection from "./ui/landing/InfoSection/InfoSection";
import DemoSlider from "./ui/utils/SliderSwiper";

import dataSlider from "@/app/_data/slider-data.json";

export default function Home() {
  return (
    <>
      <Header/>
      <main className="max-w-6xl m-auto">
        <div>
          <DemoSlider data={dataSlider} />
        </div>
        <InfoSection/>
      </main>
    </>
  );
}
