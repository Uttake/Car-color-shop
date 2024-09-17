"use client";

import React from "react";

type CounterType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const Counter = ({ count, setCount }: CounterType) => {
  return (
    <div className="flex items-center">
      <button
        className="text-orange-brdr font-bold w-10 h-10 border-orange-brdr border-4 hover:bg-orange-brdr hover:text-white transition"
        onClick={() => setCount(count > 1 ? count - 1 : 1)}
      >
        -
      </button>
      <div className=" flex justify-center items-center text-xl font-medium text-orange-brdr border-t-4 border-b-4 border-orange-brdr text-center w-20 h-10">
        {count}
      </div>
      <button
        className=" text-orange-brdr font-bold w-10 h-10 border-orange-brdr border-4 hover:bg-orange-brdr hover:text-white transition"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
