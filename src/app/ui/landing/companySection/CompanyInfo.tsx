import Image from "next/image";
import React from "react";
import MainButton from "../../components/MainButton";
import s from "./company.module.css";

const CompanyInfo = () => {
  return (
    <div className="flex gap-6 mt-[74px] flex-wrap xl:justify-center sm:relative">
      <div className={s.imageBlock}>
        <Image
          src={"/companyPerson.webp"}
          alt="company man"
          width={360}
          height={347}
          className={s.image}
          loading="lazy"
        />
      </div>
      <div className="max-w-[744px] p-8 flex flex-col justify-between border-4 border-[#C53720] overflow-hidden bg-alphablack sm:p-4">
        <h2 className="text-white font-medium text-base mb-7 md:text-sm">
          «Ваш автомобиль потерял свой блеск или имеет повреждения на кузове? Не
          проблема! Вам в «TARCOLOR»! Мы предлагаем только качественные
          автоэмали и профессиональное оборудование для покраски, которые
          обеспечат вашему авто новый, как с конвейера, внешний вид. С 1997 года
          сеть магазинов «TARCOLOR» специализируется на продаже автоэмалей и
          всего необходимого оборудования для покраски автомобилей. Мы подберём
          именно то, что нужно для вашего авто!»
        </h2>
        <MainButton
          title="УЗНАТЬ БОЛЬШЕ"
          fontSize="text-sm"
          color="text-white"
          maxW="w-[216px]"
          hgt="h-[52px]"
          classes="sm:absolute sm:left-0 sm:bottom-[-12%]"
          href="/company"
        />
      </div>
    </div>
  );
};

export default CompanyInfo;
