"use client";
import React, { useState } from "react";
import MainButton from "../components/MainButton";
import Counter from "../components/Count";
import ShopIcon from "@/app/_assets/shop.svg";
import Basket from "../components/basket/Basket";
import { useBasket } from "../components/BasketContext";

const HeaderInfo = () => {
  const { cardOpen, setCardOpen } = useBasket();
  return (
    <div className="flex justify-center items-center gap-5 relative">
      <MainButton
        title="ЗАКАЗАТЬ ЗВОНОК"
        fontSize="text-xs"
        color="text-white"
        maxW="max-w-[168px]"
        hgt="h-[40px]"
        href="/"
        classes=" px-4"
      />
      <button className="flex" onClick={() => setCardOpen(!cardOpen)}>
        <ShopIcon />
        <Counter className="" />
      </button>
      <Basket isCartOpen={cardOpen} setCartOpen={setCardOpen} />
    </div>
  );
};

export default HeaderInfo;
