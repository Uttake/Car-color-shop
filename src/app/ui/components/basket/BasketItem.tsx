"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Counter from "../Counter";
import { BasketItemTypes } from "./Basket";
import CloseTag from "../../../_assets/close.svg";
import Link from "next/link";

const BasketItem = ({
  item,
  course,
}: {
  item: BasketItemTypes;
  course: number;
}) => {
  const [count, setCount] = useState(item.count);
  let array: Array<BasketItemTypes> = Array.from(
    JSON.parse(localStorage.getItem("basket")!)
  );

  function addCount() {
    let include = array.find((el) => el.id === item.id);
    if (include) {
      array = array.map((el) =>
        el.id === item.id ? { ...el, count: count } : el
      );
      localStorage.setItem("basket", JSON.stringify([...array]));
      return;
    }
  }

  function removeOrder(id: string) {
    let newOrderArr = array.filter((el) => el.id !== id);
    localStorage.setItem("basket", JSON.stringify(newOrderArr));
    window.dispatchEvent(new Event("storage"));
  }

  useEffect(() => {
    if (count !== item.count) {
      addCount();
      window.dispatchEvent(new Event("storage"));
    }
  }, [count]);

  return (
    <div
      className="border-b-2 border-b-orange-brdr pb-5 flex items-center py-5 md:flex-col md:relative md:mt-5"
      key={item.id}
    >
      <Link href={`/catalog/${item.id}`} scroll={false}>
        <Image
          src={item.images}
          alt={item.title}
          width={150}
          height={150}
          className=" mb-5 basis-[22.5%]"
        />
      </Link>
      <Link href={`/catalog/${item.id}`} className="basis-[22.5%]">
        <h2 className="text-xl mb-3 ">{item.title}</h2>
      </Link>
      <div className="basis-[22.5%]">
        <Counter count={count} setCount={setCount} />
      </div>

      <div className="text-xl basis-[22.5%] text-center">
        {item.discount
          ? ((item.price * course - item.discount) * count).toFixed(2)
          : (item.price * course * count).toFixed(2)}{" "}
        BYN
      </div>
      <button
        aria-label="удалить из корзины"
        className="basis-[10%] self-start font-bold flex justify-end"
        onClick={() => removeOrder(item.id)}
      >
        <CloseTag className="stroke-black hover:stroke-orange-brdr stroke-[4px] transition md:absolute md:top-0 md:right-0" />
      </button>
    </div>
  );
};

export default BasketItem;
