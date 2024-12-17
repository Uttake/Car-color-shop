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

const ShopCardButton = ({
  id,
  title,
  images,
  price,
  discount,
  avaiblity,
}: CataloItemsType) => {
  const [count, setCount] = useState<number>(1);
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
    discount,
  }: ShopCardButtonType) => {
    let orderItem = {
      id,
      title,
      price,
      images,
      count,
      inBasket: true,
      discount,
    };
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
    <div className="flex justify-between items-center mb-5 gap-5 " key={id}>
      {disabled || !avaiblity ? (
        <MainButton
          title={disabled ? "Товар в корзине" : "Нет в наличии"}
          maxW="w-[164px]"
          hgt="h-[40px]"
          color={disabled ? "text-[#C53720]" : "text-alphablack"}
          classes={clsx({
            "bg-alphablack border-alphablack ": !avaiblity,
          })}
          href=""
          hover={"pointer-events-none"}
          onClick={(e) => e.preventDefault()}
          disabled={disabled}
        />
      ) : (
        <Counter count={count} setCount={setCount} />
      )}
      <button
        aria-label="add to order"
        className={clsx(
          {
            "group p-[6px] border-4 border-orange-brdr hover:bg-orange-brdr disabled:bg-orange-brdr":
              avaiblity,
          },
          {
            "bg-alphablack border-alphablack p-[6px] border-4 pointer-events-none":
              !avaiblity,
          }
        )}
        onClick={() =>
          addToOrder({ id, title, price, images, count, discount })
        }
        disabled={disabled || !avaiblity}
      >
        <ShopCard
          strokeWidth="2"
          className={clsx(
            {
              "stroke-orange-brdr group-hover:stroke-white group-disabled:stroke-white":
                avaiblity,
            },
            {
              "stroke-alphablack": !avaiblity,
            }
          )}
        />
      </button>
    </div>
  );
};

export default ShopCardButton;
