"use client";
import Image from "next/image";
import React from "react";
import Counter from "../Counter";
import BasketItem from "./BasketItem";

export interface BasketTypes {
  id: number;
  title: string;
  image: string;
  price: string;
  [key: string]: any;
}

export type BasketItemTypes = {
  id: string;
  title: string;
  price: number;
  image: string;
};

const Basket = ({ orders }: BasketTypes) => {
  return (
    <div>
      <div>
        <h2>Заказы</h2>
      </div>
      <div>
        {orders.map((item: BasketItemTypes) => (
          <BasketItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default Basket;
