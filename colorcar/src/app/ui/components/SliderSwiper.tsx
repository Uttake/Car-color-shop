"use client"; // <===== REQUIRED

import React from "react";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";


interface Slide {
  id: number;
  title: string;
  tagline: string;
  image: string;
  buttons: ButtonProps[];
}

interface ButtonProps {
  id: number;
  type: string;
}

interface DemoSliderProps {
  data: Slide[];
}

interface ButtonProps {
    id: number;
    text: string;
    link: string;
    type: string;
  }


const SliderButtons: React.FC<{ buttons: ButtonProps[] }> = ({ buttons }) => {
    return buttons.map(({ id, link, text }) => (
      <a target="_blank" key={id} href={link}>
        <span>{text}</span>
      </a>
    ));
};


const DemoSlider: React.FC<DemoSliderProps> = ({ data }) => {
  return (
    <section className="w-ful h-[32rem]">
      <div className=" h-screen">
        <ul className="h-full w-full">
          <Swiper
            pagination={{ type: "bullets", clickable: true }}
            autoplay={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            className="h-[600px]"
          >
            {data.map(({ id, image, tagline, title, buttons }) => (
              <SwiperSlide key={id}>
                <div
                  className="h-full w-full absolute left-0 top-0 "
                  style={{
                    background: `url(${image}) center center / cover scroll no-repeat`,
                  }}
                ></div>
                <div className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="absolute left-4 top-1/3">
                    {tagline && (
                      <p className="text-md sm:text-xl lg:text-3xl font-semibold text-white">
                        {tagline}
                      </p>
                    )}
                    <p className="text-3xl sm:text-6xl lg:text-8xl font-bold text-white">
                      {title}
                    </p>
                    {buttons.length > 0 ? (
                      <p className=" bg-gray-800 inline-block px-9 py-2 rounded-full text-white mt-10 lg:mt-20">
                        <SliderButtons buttons={buttons} />
                      </p>
                    ) : null}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default DemoSlider;
