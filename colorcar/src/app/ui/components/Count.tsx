"use client";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
type countType = {
  className: string;
};
const Counter = ({ className }: countType) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    function updateCount() {
      let basketCount;
      if (localStorage.getItem("basket")) {
        basketCount = Array.from(JSON.parse(localStorage.getItem("basket")!));
        setCount(basketCount.length);
      }
    }
    updateCount();
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("storage", updateCount);
    };
  }, [count]);
  return (
    <div
      className={clsx(
        "bg-red-600 text-white rounded-full w-[30px] h-8 flex justify-center items-center ml-1",
        className
      )}
    >
      {count}
    </div>
  );
};

export default Counter;
