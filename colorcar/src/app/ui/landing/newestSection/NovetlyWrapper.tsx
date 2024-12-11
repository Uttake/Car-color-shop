import React from "react";
import { getNewest } from "@/app/utils/actions";
import NoveltySlider from "./NoveltySlider";

const NoveltySliderWrapper = async () => {
  const items = await getNewest();
  return (
    <div>
      <NoveltySlider data={items} />
    </div>
  );
};

export default NoveltySliderWrapper;
