import Header from "./ui/header/Header";
import DemoSlider from "./ui/utils/SliderSwiper";

import dataSlider from '@/app/_data/slider-data.json'

export default function Home() {
  return (
    <>
      <Header/>
      <main>
        <div>
          <DemoSlider data={dataSlider}/>
        </div>
      </main>
    </>
  );
}
