import clsx from "clsx";
import Link from "next/link";
import React from "react";

type MainButtonType = {
  title?: string;
  fontSize?: string;
  color?: string;
  maxW?: string;
  hgt?: string;
  classes?: string;
  href: string;
  hover?: string;
  disabled?: boolean;
  type?: string;
  onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
};

const MainButton = ({
  title,
  fontSize,
  color,
  maxW,
  hgt,
  classes,
  href,
  hover,
  onClick,
  disabled,
}: MainButtonType) => {
  return (
    <Link
      href={href}
      scroll={false}
      className={clsx(
        "group",
        maxW,
        "border-4 border-orange-brdr w-full transition-all duration-300 flex justify-center items-center",
        hgt,
        classes,
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
    >
      <span
        onClick={!disabled ? onClick : undefined}
        className={clsx(
          "flex justify-center items-center w-full h-full font-bold transition-all duration-300",
          fontSize,
          color,
          hover,
          disabled
            ? "pointer-events-none group-hover:none"
            : "group-hover:bg-[#d42e12] group-hover:text-white"
        )}
      >
        {title}
      </span>
    </Link>
  );
};

export default MainButton;
