"use client";
import React, { useEffect, useState } from "react";
import BasketItem from "./BasketItem";
import clsx from "clsx";
import MainButton from "../MainButton";
import { getUsd } from "@/app/utils";

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
  discount?: number;
};

const Basket = ({
  isCartOpen,
  setCartOpen,
}: {
  isCartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [basketOrders, setBasketOrders] = useState<BasketItemTypes[]>([]);
  const [fullPrice, setFullPrice] = useState(0);
  const [course, setCourse] = useState(0);

  const handleCourseChange = async () => {
    const course = await getUsd();
    setCourse(course);
  };
  function checkUserData() {
    const item = JSON.parse(localStorage.getItem("basket")!);
    if (item) {
      let price = 0;
      item.forEach((el: BasketItemTypes) => {
        if (el.discount) {
          price += el.count * (el.price - el.discount);
          return;
        } else {
          price += el.count * el.price;
        }
      });
      setBasketOrders(item);
      setFullPrice(price);
    }
  }

  useEffect(() => {
    handleCourseChange();
  }, []);

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
        "absolute top-[80px] w-[800px] bg-white flex flex-col right-0 p-10 gap-10 py-10 transition ease-in-out sm:right-0 max-h-[700px] overflow-y-scroll border-2 border-[#1D1D1D] rounded-md z-[1000] lg:w-[600px] md:p-5 md:w-[470px] sm:w-full ",
        {
          "opacity-100 scale-100": isCartOpen,
          "scale-0 opacity-0": !isCartOpen,
        }
      )}
    >
      <div>
        <h2 className=" text-2xl border-b-2 border-b-orange-brdr pb-3 font-bold">
          Ваши заказы
        </h2>
      </div>
      {basketOrders.length === 0 && <div>Корзина пуста</div>}
      <div className=" max-h-[500px] overflow-auto">
        {basketOrders.map((item: BasketItemTypes) => (
          <BasketItem item={item} key={item.id} course={course} />
        ))}
      </div>
      <div className="flex justify-between flex-wrap">
        <div className="text-2xl font-bold">
          Итого: {(fullPrice * course).toFixed(2)} BYN
        </div>
        {basketOrders.length > 0 && (
          <MainButton
            title="Оформить заказ"
            href="/order/#order"
            maxW="w-[176px]"
            color="white"
            hgt="h-[40px]"
            onClick={() => setCartOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Basket;
