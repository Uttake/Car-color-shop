"use client";
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import MainButton from "../MainButton";
import DOMPurify from "isomorphic-dompurify";

interface Slide {
  id: number;
  title: string;
  image: string;
  link: string;
}

const DemoSlider = ({ sliderData }: { sliderData: Slide[] }) => {
  const [isLoopEnabled, setIsLoopEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoopEnabled(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full h-[350px] min-h-[350px]">
      <div className="h-full w-full">
        <Swiper
          key={isLoopEnabled ? "loop-enabled" : "loop-disabled"}
          pagination={{
            type: "bullets",
            clickable: true,
          }}
          autoplay={{ delay: 5000 }}
          loop={isLoopEnabled}
          modules={[Autoplay, Navigation, Pagination]}
          className={"sliderContainer"}
        >
          {sliderData.map(({ id, image, title, link }, index) => (
            <SwiperSlide key={id} className="relative">
              <Image
                src={image}
                alt={title}
                fill
                priority={index === 0}
                placeholder="blur"
                blurDataURL={image.replace(".jpg", "-lowres.jpg")}
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="absolute top-[19.3%] left-[20%] max-w-[586px]">
                  <div
                    className=" text-5xl mb-5"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(title),
                    }}
                  ></div>
                  <MainButton
                    title="ПЕРЕЙТИ В КАТАЛОГ"
                    fontSize="text-sm"
                    color="text-white"
                    maxW="max-w-[216px]"
                    hgt="h-[52px]"
                    href={link ? `/catalog/${link}` : "/catalog"}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DemoSlider;
