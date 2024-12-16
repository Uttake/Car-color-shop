import React from "react";
import Breadcrumbs from "../ui/components/Breadcrumb";
import Title from "../ui/components/Title";
import ContactInfo from "../ui/landing/contactSection/ContactInfo";
import MapY from "../ui/components/MapY";

export const metadata = {
  title: "Контакты | Tarcolor",
  description:
    "Контактная информация Tarcolor. Мы находимся в г. Могилеве, ул. Турова 3, корпус 1. Позвоните нам: +375 29 388-82-93.",
};

let path = [
  { label: "Главная", href: "/" },
  {
    label: "Контакты",
    href: `/contacts`,
    active: true,
  },
];

const page = () => {
  return (
    <>
      <Breadcrumbs breadcrumbs={path} />
      <section className="bg-[#EDEDED] py-20">
        <div className="wrapper">
          <Title title="Контакты" color="#0000" />
          <h3 className="text-[#1d1d1d] text-2xl text-center font-medium mb-9 md:text-lg">
            Автоэмали Могилев
          </h3>
          <div className="flex flex-wrap w-full">
            <ContactInfo />
            <MapY />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
