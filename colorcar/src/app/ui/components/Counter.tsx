"use client";

import React from "react";

type CounterType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const Counter = ({ count, setCount }: CounterType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.valueAsNumber;
    if (value < 1) value = 1;
    if (value > 100) value = 100;
    setCount(value);
  };

  return (
    <div className="flex items-center">
      <button
        className="text-orange-brdr font-bold w-10 h-10 border-orange-brdr border-4 hover:bg-orange-brdr hover:text-white transition"
        onClick={() => setCount(count > 1 ? count - 1 : 1)}
      >
        -
      </button>
      <div>
        <input
          type="number"
          value={count}
          min={1}
          max={100}
          onChange={handleChange}
          className=" flex justify-center items-center text-xl font-medium text-orange-brdr border-t-4 border-b-4 border-orange-brdr text-center w-20 h-10 focus-within:ring-transparent focus:border-orange-brdr"
        />
      </div>
      <button
        className=" text-orange-brdr font-bold w-10 h-10 border-orange-brdr border-4 hover:bg-orange-brdr hover:text-white transition"
        onClick={() => setCount(count < 100 ? count + 1 : 100)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
