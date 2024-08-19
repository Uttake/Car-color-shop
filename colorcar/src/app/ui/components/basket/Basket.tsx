"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Counter from "../Counter";
import BasketItem from "./BasketItem";
import clsx from "clsx";

export interface BasketTypes {
  id: number;
  title: string;
  image: string;
  price: number;
  [key: string]: any;
}

export type BasketItemTypes = {
  id: string;
  title: string;
  price: number;
  images: string;
  count: number;
  inBasket?: boolean;
};

const Basket = ({ cardOpen }: { cardOpen: boolean }) => {
  const [basketOrders, setBasketOrders] = useState<BasketItemTypes[]>([]);
  const [fullPrice, setFullPrice] = useState(0);
  function checkUserData() {
    const item = JSON.parse(localStorage.getItem("basket")!);
    if (item) {
      let price = 0;
      item.forEach((el: BasketItemTypes) => (price += el.price * el.count));
      setBasketOrders(item);
      setFullPrice(price);
    }
  }
  useEffect(() => {
    checkUserData();
    window.addEventListener("storage", checkUserData);
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, []);

  return (
    <div
      className={clsx(
        "absolute top-[80px] w-[800px] bg-white flex flex-col right-0 p-10 gap-10 py-10 transition ease-in-out sm:right-0 max-h-[700px] overflow-y-scroll border-2 border-[#1D1D1D] rounded-md z-50",
        {
          "opacity-100 scale-100": cardOpen,
          "scale-0 opacity-0": !cardOpen,
        }
      )}
    >
      <div>
        <h2 className=" text-2xl border-b-2 border-b-orange-brdr pb-3 font-bold">
          Заказы
        </h2>
      </div>
      {basketOrders.length === 0 && <div>Корзина пуста</div>}
      <div>
        {basketOrders.map((item: BasketItemTypes) => (
          <BasketItem item={item} key={item.id} />
        ))}
      </div>
      <div className="text-2xl font-bold">Итого: {fullPrice.toFixed(2)}</div>
    </div>
  );
};

export default Basket;
