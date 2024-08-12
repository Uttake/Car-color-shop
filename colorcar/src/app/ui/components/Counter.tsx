"use client";

import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="bg-white text-indigo-600 font-bold rounded-lg border shadow-lg p-10">
        <h1 className="text-2xl mb-5">React Counter</h1>
        <div className="text-4xl mb-5">{count}</div>
        <div className="flex space-x-4">
          <button
            className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
            onClick={() => setCount(count + 1)}
          >
            Increment
          </button>
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
            onClick={() => setCount(count - 1)}
          >
            Decrement
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
