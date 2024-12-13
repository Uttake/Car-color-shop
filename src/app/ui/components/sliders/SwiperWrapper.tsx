import React from "react";
import { getInfo } from "../../../utils/actions";
import DemoSlider from "./SliderSwiper";

const SwiperWrapper = async () => {
  const sliderData = await getInfo();

  return (
    <>
      <div>
        <DemoSlider sliderData={sliderData || []} />
      </div>
    </>
  );
};

export default SwiperWrapper;
