"use client";

import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MainButton from "./MainButton";
import { getInfo } from "@/app/utils/actions";

interface Slide {
  id: number;
  title: string;
  image: string;
  link: string;
}

interface DemoSliderProps {
  data: Slide[];
}

const DemoSlider: React.FC<DemoSliderProps> = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res: any = await getInfo();
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="w-full">
      <div className="h-full w-full">
        <Swiper
          pagination={{ type: "bullets", clickable: true }}
          autoplay={true}
          loop={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="h-[350px]"
        >
          {data.map(({ id, image, title, link }) => (
            <SwiperSlide key={id}>
              <div
                className="h-full w-full absolute left-0 top-0 "
                style={{
                  background: `url(${image}) bottom center / cover scroll no-repeat`,
                }}
              ></div>
              <div className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div>
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="absolute top-[19.3%] left-[20%] max-w-[586px]">
                  <p
                    className="text-5xl mb-12 font-bold text-white sm:text-2xl"
                    dangerouslySetInnerHTML={{ __html: title }}
                  ></p>
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
