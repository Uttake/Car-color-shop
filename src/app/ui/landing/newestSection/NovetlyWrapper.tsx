import React from "react";
import { getNewest } from "@/app/utils/actions";
import NoveltySlider from "./NoveltySlider";
import { unstable_noStore as noStore } from "next/cache";

const NoveltySliderWrapper = async () => {
  noStore();
  const items = await getNewest();
  if (items?.length === 0) return null;
  return (
    <div>
      <NoveltySlider data={items || []} />
    </div>
  );
};

export default NoveltySliderWrapper;
