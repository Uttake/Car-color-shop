"use client";
import React, { useEffect, useState } from "react";

import ShopCard from "../../_assets/ShopCard.svg";
import Counter from "./Counter";
import { CataloItemsType } from "@/app/utils/definitions";
import clsx from "clsx";
import { BasketItemTypes } from "./basket/Basket";
import MainButton from "./MainButton";

export interface ShopCardButtonType extends CataloItemsType {
  count: number;
}

const ShopCardButton = ({ id, title, images, price }: CataloItemsType) => {
  const [count, setCount] = useState(1);
  const [disabled, setDisabled] = useState(false);

  let array: Array<any> = [];

  function checkInBasket() {
    let storage: Array<BasketItemTypes> = Array.from(
      JSON.parse(localStorage.getItem("basket")!)
    );
    let include = storage.find((el) => el.id === id);
    setDisabled(false);
    if (include?.inBasket) {
      setDisabled(true);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("basket")) {
      localStorage.setItem("basket", JSON.stringify(array));
    }
    checkInBasket();
    window.addEventListener("storage", checkInBasket);
    return () => {
      window.removeEventListener("storage", checkInBasket);
    };
  }, []);

  const addToOrder = ({
    id,
    title,
    price,
    images,
    count,
  }: ShopCardButtonType) => {
    let orderItem = { id, title, price, images, count, inBasket: true };
    array = JSON.parse(localStorage.getItem("basket")!);
    let duplicateOrder = array.find((el: ShopCardButtonType) => el.id === id);

    if (duplicateOrder) {
      setDisabled(true);
      return;
    }

    localStorage.setItem("basket", JSON.stringify([...array, orderItem]));
    window.dispatchEvent(new Event("storage"));
  };
  return (
    <div className="flex justify-between items-center mb-5" key={id}>
      {disabled ? (
        <MainButton
          title="Товар в корзине"
          maxW="max-w-[164px]"
          hgt="h-[40px]"
          color="text-[#C53720]"
          href=""
          hover={"pointer-events-none"}
          onClick={(e) => e.preventDefault()}
          disabled={disabled}
        />
      ) : (
        <Counter count={count} setCount={setCount} />
      )}
      <button
        className="group p-[6px] border-4 border-orange-brdr hover:bg-orange-brdr disabled:bg-orange-brdr"
        onClick={() => addToOrder({ id, title, price, images, count })}
        disabled={disabled}
      >
        <ShopCard
          strokeWidth="2"
          className=" stroke-orange-brdr group-hover:stroke-white group-disabled:stroke-white"
        />
      </button>
    </div>
  );
};

export default ShopCardButton;
