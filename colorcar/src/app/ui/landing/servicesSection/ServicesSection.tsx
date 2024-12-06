import React from "react";
import Title from "../../components/Title";
import s from "./servicesSection.module.css";
import ServicesList from "./ServicesList";
import MainButton from "../../components/MainButton";

const ServicesSection = () => {
  return (
    <section className={s.section}>
      <div className="wrapper">
        <Title title="Наши преимущества" color="#ffff" />
        <h3 className="text-[#ffff] text-2xl text-center font-medium mb-9">
          {" "}
          Менеджеры компании с радостью ответят на ваши вопросы и помогут с
          выбором продукции.{" "}
        </h3>
        <ServicesList />
        <div className=" text-center mt-[72px] font-bold">
          <MainButton
            title="ЗАДАТЬ ВОПРОС"
            fontSize="text-sm"
            color="text-white"
            maxW="max-w-[236px]"
            hgt="h-[56px]"
            href="/"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
