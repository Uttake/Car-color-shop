import React from "react";
import { getInfo } from "../../../utils/data";
import DemoSlider from "./SliderSwiper";
import Head from "next/head";

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
