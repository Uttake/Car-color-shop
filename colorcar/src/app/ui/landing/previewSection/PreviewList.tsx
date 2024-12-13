import React from "react";
import { v1 } from "uuid";
import PreviewItem from "./PreviewItem";

let previewData = [
  {
    id: v1(),
    title: "Эмали",
    image: "/emali.webp",
    href: "/catalog/emali",
  },
  {
    id: v1(),
    title: "Лаки",
    image: "/laki.webp",
    href: "/catalog/laki",
  },
  {
    id: v1(),
    title: "Шпатлевка",
    image: "/shpatlevka.webp",
    href: "/catalog/shpaklevka",
  },
  {
    id: v1(),
    title: "Грунты",
    image: "/grunti.webp",
    href: "/catalog/grunti",
  },
  {
    id: v1(),
    title: "Аэрозоли",
    image: "/aerosol.webp",
    href: "/catalog/aerosol",
  },
  {
    id: v1(),
    title: "Расходные материалы",
    image: "/rashodniki.webp",
    href: "/catalog/rashodniki",
  },
];

const PreviewList = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {previewData.map((item) => (
        <PreviewItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default PreviewList;
