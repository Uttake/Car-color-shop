"use client";
import React, { use, useEffect, useState } from "react";
import { BasketItemTypes } from "../basket/Basket";
import MainButton from "../MainButton";
import { useBasket } from "../BasketContext";

const OrderInfo = () => {
  const [basketOrders, setBasketOrders] = useState<BasketItemTypes[]>([]);
  const [fullPrice, setFullPrice] = useState(0);
  const { cardOpen, setCardOpen } = useBasket();
  function checkUserData() {
    const item = JSON.parse(localStorage.getItem("basket")!);
    if (item) {
      let price = 0;
      item.forEach((el: BasketItemTypes) =>
        el.discount
          ? (price += el.count * (el.price - el.discount))
          : (price += el.count * el.price)
      );
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

  const handleChangeCart = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setCardOpen(true);
  };

  return (
    <div className=" max-w-[456px] w-full">
      <div className=" p-5 bg-[#1d1d1d] flex justify-between items-center">
        <h2 className=" text-xl text-white">Ваш заказ</h2>
        <MainButton
          title="ИЗМЕНИТЬ"
          href="/order"
          color="text-white"
          maxW="max-w-[112px]"
          hgt="h-[40px]"
          fontSize="text-xs"
          onClick={handleChangeCart}
        />
      </div>
      <div className="border-4 border-[#a5a5a5]">
        {basketOrders.length > 0 ? (
          basketOrders.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-5 border-b-4 border-[#a5a5a5] last:border-b-0"
            >
              <div className="text-base font-medium">
                <h3 className=" text-[#C53720]">{item.title}</h3>
                <p className=" text-[#A5A5A5]">
                  {item.count} шт. х{" "}
                  {item.discount ? item.price - item.discount : item.price} BYN.
                </p>
              </div>
              <div>
                {item.discount
                  ? (item.count * (item.price - item.discount)).toFixed(2)
                  : (item.count * item.price).toFixed(2)}
                BYN
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 flex justify-center items-center">
            Корзина пуста
          </div>
        )}
      </div>
      <div className="p-5 flex justify-between bg-[#1d1d1d] text-white text-base font-medium">
        <span>Итого</span>
        <span className=" text-xl font-bold">{fullPrice} BYN.</span>
      </div>
    </div>
  );
};

export default OrderInfo;
