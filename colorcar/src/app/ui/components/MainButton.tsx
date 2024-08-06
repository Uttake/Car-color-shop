import clsx from "clsx";
import React from "react";

type MainButtonType = {
  title: string;
  fontSize: string;
  color: string;
  maxW: string;
  hgt: string;
};

const MainButton = ({ title, fontSize, color, maxW, hgt }: MainButtonType) => {
  return (
    <button
      className={clsx(
        maxW,
        "border-4 border-[#d42e12] w-full cursor-pointer hover:bg-[#d42e12] transition-all",
        hgt
      )}
    >
      <span className={clsx(fontSize, color, "font-bold")}>{title}</span>
    </button>
  );
};

export default MainButton;
