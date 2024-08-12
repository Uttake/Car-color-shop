"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Counter from "../Counter";
import ShopCard from "../../../_assets/ShopCard.svg";
import MainButton from "../MainButton";
export type CataloItemsType = {
  id: string;
  title: string;
  price: number;
  image: string;
};

const CatalogItem = ({ title, price, image, id }: CataloItemsType) => {
  const [itemOrder, setItemOrder] = useState<Array<string | number>[]>([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(itemOrder));
  }, [itemOrder]);

  const addToOrder = ({ id, title, price, image }: CataloItemsType) => {
    let orderItem = [id, title, price, image];
    setItemOrder(Array.from(new Set([...itemOrder, orderItem])));
  };

  return (
    <div className="border-4 px-5 py-8 bg-white cursor-pointer hover:border-orange-brdr transition duration-300">
      <div className=" mb-4">
        <Image src={image} alt={title} width={264} height={500} />
      </div>
      <h2 className=" text-[#C53720] text-xl font-medium mb-11">{title}</h2>
      <div className=" text-[#1D1D1D] text-3xl mb-5 font-bold">{price} BYN</div>
      <div className="flex justify-between items-center mb-5">
        <Counter />
        <button
          className="group p-[6px] border-4 border-orange-brdr hover:bg-orange-brdr"
          onClick={() => addToOrder({ id, title, price, image })}
        >
          <ShopCard
            strokeWidth="2"
            className=" stroke-orange-brdr group-hover:stroke-white"
          />
        </button>
      </div>
      <MainButton
        maxW="max-w-[224px]"
        hgt="h-[40px]"
        title="ПОДРОБНЕЕ"
        color="text-[#c53720]"
        href="/"
        hover="group-hover:text-white"
      />
    </div>
  );
};

export default CatalogItem;
