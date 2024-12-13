import React from "react";
import FooterItem from "./FooterItem";

const footerData = [
  {
    maintitle: "КОМПАНИЯ",
    subtitle: [
      { title: "О КОМПАНИИ" },
      { title: "ОТЗЫВЫ КЛИЕНТОВ" },
      { title: "РЕКВИЗИТЫ" },
    ],
  },
  {
    maintitle: "КАТАЛОГ",
    subtitle: [
      { title: "АККУМУЛЯТОРЫ" },
      { title: "АВТОМАСЛА" },
      { title: "АКСЕССУАРЫ" },
      { title: "АВТОХИМИЯ" },
    ],
  },
  {
    maintitle: "УСЛУГИ",
    subtitle: [
      { title: "ДИАГНОСТИКА АККУМУЛЯТОРА" },
      { title: "ПРИЕМ АККУМУЛЯТОРОВ" },
    ],
  },
  {
    maintitle: "ИНФОРМАЦИЯ",
    subtitle: [
      { title: "АКЦИИ" },
      { title: "НОВОСТИ" },
      { title: "СТАТЬИ" },
      { title: "ВОПРОС - ОТВЕТ" },
    ],
  },
];

const FooterList = async () => {
  return (
    <div className="flex justify-between basis-[60%] flex-wrap md:basis-full md:gap-6">
      {footerData.map((item) => (
        <FooterItem key={item.maintitle} item={item} />
      ))}
    </div>
  );
};

export default FooterList;
