import Image from "next/image";
import React from "react";
import MainButton from "../../components/MainButton";
import s from "./company.module.css";

const CompanyInfo = () => {
  return (
    <div className="flex gap-6 mt-[74px] flex-wrap xl:justify-center sm:relative">
      <div className={s.imageBlock}>
        <Image
          src={"/companyPerson.png"}
          alt="company man"
          width={360}
          height={347}
          className={s.image}
        />
      </div>
      <div className="max-w-[744px] p-8 h-64 border-4 border-[#C53720] bg-alphablack sm:p-4">
        <h2 className="text-white font-medium text-base mb-7 md:text-sm md:overflow-scroll">
          Машина плохо заводится? Аккумулятор вас подводит? Не проблема! Вам в
          «PRO Auto»! Мы подберём хороший, надёжный, а главное недорогой
          аккумулятор именно для вашего авто! С 1997 года сеть магазинов «PRO
          Auto» занимается продажей автомобильных аккумуляторов, масел,
          расходных материалов, химией и аксессуаров.
        </h2>
        <MainButton
          title="УЗНАТЬ БОЛЬШЕ"
          fontSize="text-sm"
          color="text-white"
          maxW="max-w-[216px]"
          hgt="h-[52px]"
          classes="sm:absolute sm:left-0 sm:bottom-[-12%]"
          href="/"
        />
      </div>
    </div>
  );
};

export default CompanyInfo;
