import React, { Suspense } from "react";
import Title from "../../components/Title";
import s from "./previewSection.module.css";
import PreviewList from "./PreviewList";
import Search from "../../components/Search";
import clsx from "clsx";

const PreviewSection = () => {
  return (
    <section className={clsx(s.previewSection, "relative")}>
      <div className={clsx(s.background)}></div>

      <Suspense fallback={<div>Loading...</div>}>
        <Search main={true} />
      </Suspense>
      <div className="max-w-6xl m-auto relative">
        <Title
          title="Автоэмали и лакокрасочные материалы: качественные решения для вашего автомобиля."
          color="#1d1d1d"
        />
        <h3 className="text-[#1d1d1d] text-2xl text-center font-medium mb-9 md:text-lg">
          Carpaints – это специализированный интернет-магазин автоэмалей и
          сопутствующих товаров.
        </h3>
        <PreviewList />
      </div>
    </section>
  );
};

export default PreviewSection;
