"use client";
import Breadcrumbs from "@/app/ui/components/Breadcrumb";
import CallBackWrapper from "@/app/ui/components/company/Callback/CallbackWrapper";
import ServiceItem from "@/app/ui/components/ServiceItem";
import Title from "@/app/ui/components/Title";
import { ServiceItemType } from "@/app/utils/definitions";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
const zapravkaList: ServiceItemType[] = [
  {
    title: "Преимущества услуги:",
    list: [
      {
        title: "Индивидуальный подбор цвета: ",
        desc: "Вы можете выбрать краску из готовой палитры или предоставить образец для точного колеровки.",
      },
      {
        title: "Универсальность применения:",
        desc: "Подходит для покраски автомобилей, бытовой техники, мебели, декора и других поверхностей.",
      },
      {
        title: "Экономия времени и материалов:",
        desc: "Аэрозольный формат позволяет равномерно наносить краску без дополнительных инструментов.",
      },
      {
        title: "Удобство и мобильность:",
        desc: "Компактный баллон легко использовать в любых условиях.",
      },
    ],
  },
];
const page = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Главная", href: "/" },
          {
            label: "Услуги",
            href: `/services`,
          },
          {
            label: "Заправка аэрозолей",
            href: `/services/zapravka-aerosolov`,
            active: true,
          },
        ]}
      />
      <section>
        <div className="wrapper py-20 md:px-5">
          <Title title="Заправка аэрозолей" color="#0000" />
          <p className="my-5 text-lg font-bold">
            Наша услуга закачки краски в аэрозольный баллон — это удобное
            решение для профессионалов и любителей, которые ценят точность и
            комфорт при нанесении краски. Мы наполняем аэрозольные баллоны
            краской любого цвета и оттенка, соответствующего вашим требованиям.
          </p>
          <ServiceItem data={zapravkaList} />
          <p className="my-5 text-lg font-bold">
            Мы используем только качественные краски и надежные баллоны, что
            обеспечивает стойкость покрытия и равномерное распыление. Закажите
            услугу закачки краски и получите идеальный результат с минимальными
            усилиями!
          </p>
          <div className="mt-10 w-full text-center">
            <button
              className="font-bold text-sm max-w-[216px] h-[52px] w-full text-black  border-4 border-orange-brdr  hover:bg-orange-brdr hover:text-white transition duration-300"
              onClick={() => setModalOpen(true)}
            >
              {"Заказать услугу".toUpperCase()}
            </button>
            <Modal
              isOpen={modalOpen}
              onRequestClose={closeModal}
              contentLabel="Callback modal"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[102]"
              className={`relative rounded-lg shadow-lg w-[90%] max-w-[500px] mx-auto border-t-4 border-t-orange-brdr z-[101]
              ${modalOpen ? "animate-fadeIn" : "animate-fadeOut"}`}
            >
              <CallBackWrapper
                setIsOpen={setModalOpen}
                title="Заказать услугу"
              />
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
