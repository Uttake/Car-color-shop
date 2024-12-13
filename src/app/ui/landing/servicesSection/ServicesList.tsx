import React from "react";
import { v1 } from "uuid";

import Color from "@/app/_assets/capofpaints.svg";
import InfoHelp from "@/app/_assets/info-help.svg";
import Payment from "@/app/_assets/payment.svg";
import ServicesItem from "./ServicesItem";
import Image from "next/image";
import s from "./servicesSection.module.css";

const ServicesData = [
  {
    id: v1(),
    title: "Удобная оплата",
    subtitle:
      "Принимаем как наличный, так и безналичный расчет для вашего удобства.",
    image: <Payment fill="white" width={70} height={70} />,
  },
  {
    id: v1(),
    title: "Консультация по выбору краски",
    subtitle:
      "Поможем подобрать подходящий цвет и тип краски, учитывая ваши требования и особенности авто.",
    image: <InfoHelp />,
  },
  {
    id: v1(),
    title: "Только качественная продукция",
    subtitle:
      "Предлагаем краски и материалы только проверенных брендов для долговечной защиты вашего автомобиля.",
    image: <Color width={70} height={70} fill="white" />,
  },
];

const ServicesList = () => {
  return (
    <div className="flex justify-between flex-wrap xl:justify-center">
      <div>
        {ServicesData.map((item) => (
          <ServicesItem key={item.id} item={item} />
        ))}
      </div>
      <div className={s.listImage}>
        <Image src={"/servicesMech.png"} width={460} height={500} alt="mech" />
        <div className={s.afterBlock}></div>
      </div>
    </div>
  );
};

export default ServicesList;
