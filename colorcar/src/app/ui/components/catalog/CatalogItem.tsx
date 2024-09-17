import Image from "next/image";
import React from "react";
import MainButton from "../MainButton";
import ShopCardButton from "../ShopCardButtons";
import { CataloItemsType } from "@/app/utils/definitions";

const CatalogItem = ({ title, price, images, id }: CataloItemsType) => {
  return (
    <div className="border-4 px-5 py-8 bg-white cursor-pointer hover:border-orange-brdr transition duration-300 sm:w-full has-[:disabled]:border-green-500">
      <div className=" mb-4">
        <Image src={images} alt={title} width={264} height={500} />
      </div>
      <h2 className=" text-[#C53720] text-xl font-medium mb-11">{title}</h2>
      <div className=" text-[#1D1D1D] text-3xl mb-5 font-bold">{price} BYN</div>
      <ShopCardButton title={title} price={price} images={images} id={id} />
      <MainButton
        maxW="max-w-[224px]"
        hgt="h-[40px]"
        title="ПОДРОБНЕЕ"
        color="text-[#c53720]"
        href="/contact"
        hover="group-hover:text-white"
      />
    </div>
  );
};

export default CatalogItem;
