import React from "react";
import FooterItem from "./FooterItem";

const footerData = [
  {
    maintitle: "КОМПАНИЯ",
    href: "/company",
    subtitle: [{ title: "О КОМПАНИИ", href: "/company" }],
  },
  {
    maintitle: "КАТАЛОГ",
    href: "/catalog",
    subtitle: [
      { title: "ЭМАЛИ", href: "/catalog/emali" },
      { title: "Грунты", href: "/catalog/grunti" },
      { title: "Лаки", href: "/catalog/laki" },
      { title: "Шпатлевка", href: "/catalog/shpaklevka" },
    ],
  },
  {
    maintitle: "УСЛУГИ",
    href: "/services",
    subtitle: [
      { title: "ПОДБОР КРАСКИ", href: "/services/podbor-kraski" },
      { title: "ЗАПРАВКА АЭРОЗОЛЕЙ", href: "/services/zapravka-aerosolov" },
    ],
  },
  {
    maintitle: "ИНФОРМАЦИЯ",
    href: "/info",
    subtitle: [{ title: "АКЦИИ" }, { title: "НОВОСТИ" }],
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
