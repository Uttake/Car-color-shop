import React from "react";
import { getInfo } from "../../../utils/data";
// import DemoSlider from "./SliderSwiper";
import Head from "next/head";
import dynamic from "next/dynamic";

const DemoSlider = dynamic(() => import("./SliderSwiper"), { ssr: true });
const SwiperWrapper = async () => {
  const sliderData = await getInfo();

  return (
    <>
      <Head>
        {sliderData?.[0]?.image && (
          <link rel="preload" as="image" href={sliderData[0].image} />
        )}
      </Head>
      <div>
        <DemoSlider sliderData={sliderData || []} />
      </div>
    </>
  );
};

export default SwiperWrapper;
