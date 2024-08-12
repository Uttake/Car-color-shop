"use client";
import Image from "next/image";
import React, { useState } from "react";
import Counter from "../Counter";
import { BasketItemTypes } from "./Basket";

const BasketItem = ({ item }: { item: BasketItemTypes }) => {
  const [orderCount, setOrderCount] = useState<number>(1);

  const getValue = (count: number) => setOrderCount(count);
  return (
    <div>
      <div>
        <Image src={item.image} alt={item.title} />
        <h2>{item.title}</h2>
      </div>
      <Counter getValue={getValue} />
      <div>{(item.price * orderCount).toFixed(2)}</div>
    </div>
  );
};

export default BasketItem;
