"use client";
import React, { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
interface HamburgerProps {
  isInitiallyOpen?: boolean;
}

export function Hamburger(props: HamburgerProps) {
  const { isInitiallyOpen } = props;
  const [isOpen, setIsOpen] = useState<boolean>(isInitiallyOpen ?? false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="hidden lg:block">
      <button
        onClick={handleClick}
        type="button"
        className={`w-8 h-8 flex justify-around flex-col flex-wrap z-10 cursor-pointer`}
      >
        <div
          className={`bg-white block w-8 h-[0.35rem] rounded transition-all origin-[1px] ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        />
        <div
          className={`bg-white block w-8 h-[0.35rem] rounded transition-all origin-[1px] ${
            isOpen ? "bg-transparent opacity-0" : "translate-x-0"
          }`}
        />
        <div
          className={`bg-white block w-8 h-[0.35rem] rounded transition-all origin-[1px] ${
            isOpen ? "rotate-[-45deg]" : "rotate-0"
          }`}
        />
      </button>
      <HamburgerMenu isInitiallyOpen={isOpen} />
    </div>
  );
}

export default Hamburger;
