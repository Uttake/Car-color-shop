"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { CatalogItemType } from "@/app/utils/definitions";
import Title from "../../components/Title";
import Link from "next/link";
import Image from "next/image";
import { getUsd } from "@/app/utils";
import MainButton from "../../components/MainButton";
import ArrowIcon from "../../../_assets/arrow.svg";

interface NoveltySliderProps {
  data: CatalogItemType[];
}

const NoveltySlider: React.FC<NoveltySliderProps> = ({ data }) => {
  const [course, setCourse] = useState(0);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  const getCourse = async () => {
    const res = await getUsd();
    if (res) {
      setCourse(res);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  useEffect(() => {
    if (slidesRef.current.length > 0) {
      const heights = slidesRef.current.map((slide) =>
        slide ? slide.offsetHeight : 0
      );
      setMaxHeight(Math.max(...heights));
    }
  }, [data, course]);

  return (
    data &&
    course > 0 && (
      <section className="py-10">
        <Title title="Новинки" color="#000" />
        <div className="wrapper relative flex items-center gap-3 lg:flex-wrap lg:justify-center overflow-hidden md:px-4 lg:px-2">
          <button
            aria-label="prev"
            className="custom-prev min-w-[40px] lg:order-1"
          >
            <ArrowIcon style={{ transform: "rotate(180deg)" }} />
          </button>

          <Swiper
            className="newestSlider w-full"
            modules={[Navigation, Pagination]}
            centerInsufficientSlides={true}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            slidesPerView="auto"
            spaceBetween={30}
          >
            {data.map((item: CatalogItemType, index) => (
              <SwiperSlide key={item.id} className="max-w-[274px]">
                <div
                  ref={(el) => {
                    slidesRef.current[index] = el!;
                  }}
                  style={{ height: maxHeight ? `${maxHeight}px` : "auto" }}
                  className="h-full"
                >
                  <Link
                    href={`/catalog/${item.category}/${item.id}`}
                    className="block h-full"
                  >
                    <div className="bg-white p-6 flex flex-col justify-between h-full">
                      <div className="mb-4 h-[230px]">
                        <Image
                          src={item.images}
                          alt={item.title}
                          width={274}
                          height={230}
                          className="max-w-full max-h-full object-contain cursor-pointer"
                        />
                      </div>
                      <h3 className="mb-5 text-base font-medium leading-5 overflow-hidden text-ellipsis max-h-[40px]">
                        {item.title}
                      </h3>
                      <div className="mb-5">
                        {item.discount ? (
                          <div className="relative">
                            <div className="absolute -top-5 text-[#A5A5A5] text-lg font-bold line-through">
                              {(item.price * course).toFixed(2)} BYN
                            </div>
                            <div className="text-[#C53720] text-3xl font-bold">
                              {(item.price * course - item.discount).toFixed(2)}{" "}
                              BYN
                            </div>
                          </div>
                        ) : (
                          <div className="text-[#1D1D1D] text-3xl font-bold">
                            {(item.price * course).toFixed(2)} BYN
                          </div>
                        )}
                      </div>
                      <MainButton
                        title="Подробнее"
                        hgt="h-[52px]"
                        fontSize="text-lg"
                        hover="group-hover:bg-[#d42e12] group-hover:text-white"
                        href={`/catalog/${item.category}/${item.id}`}
                      />
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            aria-label="next"
            className="custom-next min-w-[40px] lg:order-3"
          >
            <ArrowIcon />
          </button>
        </div>
      </section>
    )
  );
};

export default NoveltySlider;
