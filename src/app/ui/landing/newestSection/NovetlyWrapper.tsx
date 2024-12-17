import React from "react";
import { getNewest } from "@/app/utils/data";
import NoveltySlider from "./NoveltySlider";
import { unstable_noStore as noStore } from "next/cache";
import dynamic from "next/dynamic";

const Swiper = dynamic(() => import("./NoveltySlider"), { ssr: false });
const NoveltySliderWrapper = async () => {
  noStore();
  const items = await getNewest();
  if (items?.length === 0) return null;
  return (
    <div>
      <Swiper data={items || []} />
    </div>
  );
};

export default NoveltySliderWrapper;
