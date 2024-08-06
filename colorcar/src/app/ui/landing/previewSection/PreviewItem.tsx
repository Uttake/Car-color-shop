import Image, { StaticImageData } from "next/image";
import React from "react";
import MainButton from "../../components/MainButton";
import s from "./previewSection.module.css";
type previewItem = {
  title: string;
  image: string;
};

const PreviewItem = ({ item }: { item: previewItem }) => {
  return (
    <div className={s.previewItem}>
      <Image src={item.image} width={360} height={400} alt={item.title} />
      <div className={s.hoverItem}>
        <h3 className="text-2xl font-medium text-center text-white">
          {item.title}
        </h3>
        <MainButton
          title="Заказать онлайн"
          fontSize="text-sm"
          color="text-white"
          maxW="max-w-[216px]"
          hgt="h-[52px]"
        />
      </div>
    </div>
  );
};

export default PreviewItem;
