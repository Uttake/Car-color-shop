import React from "react";
import Breadcrumbs from "../ui/components/Breadcrumb";
import SwiperWrapper from "../ui/components/sliders/SwiperWrapper";
import Title from "../ui/components/Title";
import Image from "next/image";
import MainButton from "../ui/components/MainButton";

const servicesItems = [
  {
    title: "Подбор краски",
    href: "/services/podbor-kraski",
    image: "/podbor-kraski.webp",
  },

  {
    title: "Заправка аэрозолей",
    href: "/services/zapravka-aerosolov",
    image: "/zapravka-aerosolov.webp",
  },
];

const page = () => {
  return (
    <>
      <SwiperWrapper />
      <Breadcrumbs
        breadcrumbs={[
          { label: "Главная", href: "/" },
          {
            label: "Услуги",
            href: `/services`,
            active: true,
          },
        ]}
      />
      <section>
        <div className="wrapper py-20 md:px-5">
          <Title title="Услуги" color="#0000" />
          <div className="flex justify-center items-center gap-5 flex-wrap">
            {servicesItems.map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden max-w-[500px] w-full h-[400px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  quality={85}
                  placeholder="blur"
                  blurDataURL={item.image}
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="flex flex-col absolute top-0 left-0 justify-center gap-8 items-center w-full h-full bg-overlay">
                  <h3 className="text-2xl font-medium text-center text-white">
                    {item.title}
                  </h3>
                  <MainButton
                    title="Подробнее"
                    fontSize="text-sm"
                    color="text-white"
                    maxW="w-[216px]"
                    hgt="h-[52px]"
                    href={item.href}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
