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
  type,
}: MainButtonType) => {
  return (
    <Link href={href} scroll={false}>
      <button
        className={clsx(
          maxW,
          "group border-4 border-orange-brdr w-full cursor-pointer hover:bg-[#d42e12] transition-all duration-300",
          hgt,
          classes,
          hover,
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <span
          className={clsx(
            fontSize,
            color,
            "font-bold flex justify-center items-center w-full h-full"
          )}
        >
          {title}
        </span>
      </button>
    </Link>
  );
};

export default MainButton;