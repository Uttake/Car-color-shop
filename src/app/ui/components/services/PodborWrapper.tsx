"use client";
import React, { useEffect, useState } from "react";
import CallBackWrapper from "@/app/ui/components/company/Callback/CallbackWrapper";
import ServiceItem from "@/app/ui/components/ServiceItem";
import Modal from "react-modal";
import { ServiceItemType } from "@/app/utils/definitions";
import Title from "../Title";
const PodborWrapper = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);
  const podborList: ServiceItemType[] = [
    {
      title: "Современный подход к подбору автомобильной краски",
      desc: "Восстановление лакокрасочного покрытия автомобиля после повреждений – это не просто косметическая процедура, а важный этап сохранения эстетики и защиты кузова. Однако точное совпадение цвета нового слоя с уже существующим является сложной задачей. Решить эту проблему помогает инновационная технология – компьютерный подбор краски.",
    },
    {
      title: "Что такое компьютерный подбор?",
      desc: "Это процесс, который сочетает в себе использование специального программного обеспечения, баз данных с рецептами красок и точные расчёты. Основная цель – создание краски, которая идеально соответствует цвету вашего автомобиля. Благодаря этому, даже после ремонта, обновлённый участок выглядит как часть оригинального покрытия.",
    },
    {
      title: "Как это работает?",
      list: [
        {
          title: "Анализ цвета.",
          desc: "С помощью спектрофотометра – специального прибора – специалисты анализируют оттенок вашего автомобиля. Учитываются такие параметры, как глубина, насыщенность и переливы цвета.",
        },
        {
          title: "Подбор рецепта.",
          desc: "На основе данных прибора программа подбирает состав краски. В базе данных хранятся тысячи рецептов, что позволяет найти оптимальное сочетание пигментов.",
        },
        {
          title: "Смешивание компонентов.",
          desc: "После подбора рецепта краска создаётся в точных пропорциях, чтобы полностью соответствовать желаемому оттенку.",
        },
        {
          title: "Тестовое нанесение.",
          desc: "Готовый состав наносится на специальное тестовое полотно, чтобы убедиться в соответствии цвета. Если есть необходимость, проводятся дополнительные корректировки.",
        },
      ],
    },
    {
      title: "Преимущества компьютерного подбора",
      list: [
        {
          title: "Точность до мельчайших деталей.",
          desc: "Даже при выгорании или изменении оттенка со временем можно добиться идеального совпадения с текущим цветом кузова.",
        },
        {
          title: "Индивидуальный подход.",
          desc: "Для каждого автомобиля создаётся уникальный состав краски.",
        },
        {
          title: "Экономия времени.",
          desc: "Технология значительно ускоряет процесс подбора цвета по сравнению с традиционными методами.",
        },
      ],
    },
    {
      title: "Почему выбирают нас?",
      desc: `В наших специализированных центрах опытные мастера работают с современным оборудованием и обширной базой данных. Мы гарантируем, что результат будет соответствовать вашим ожиданиям. Весь процесс подбора и проверки проводится с учётом всех нюансов, чтобы ваш автомобиль выглядел идеально после ремонта.
      Обращаясь к нам, вы получаете профессиональный подход, качественные материалы и уверенность в том, что ваш автомобиль сохранит свой безупречный внешний вид!`,
    },
  ];
  return (
    <div className="wrapper py-20 md:px-5">
      <Title title="Подбор краски" color="#0000" />
      <ServiceItem data={podborList} />
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
          <CallBackWrapper setIsOpen={setModalOpen} title="Заказать услугу" />
        </Modal>
      </div>
    </div>
  );
};

export default PodborWrapper;
