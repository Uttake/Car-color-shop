import Image, { StaticImageData } from "next/image";
import React from "react";
import MainButton from "../../components/MainButton";
import s from "./previewSection.module.css";
type previewItem = {
  title: string;
  image: string;
  href: string;
};

const PreviewItem = ({ item }: { item: previewItem }) => {
  return (
    <div
      className={s.previewItem}
      style={{ backgroundImage: `url(${item.image})` }}
    >
      <div className={s.hoverItem}>
        <h3 className="text-2xl font-medium text-center text-white">
          {item.title.toUpperCase()}
        </h3>
        <MainButton
          title="Заказать онлайн"
          fontSize="text-sm"
          color="text-white"
          maxW="max-w-[216px]"
          hgt="h-[52px]"
          href={item.href}
        />
      </div>
    </div>
  );
};

export default PreviewItem;
