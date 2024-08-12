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
};

const MainButton = ({
  title,
  fontSize,
  color,
  maxW,
  hgt,
  classes,
  href,
}: MainButtonType) => {
  return (
    <button
      className={clsx(
        maxW,
        "border-4 border-orange-brdr w-full cursor-pointer hover:bg-[#d42e12] transition-all",
        hgt,
        classes
      )}
    >
      <Link href={href} className={clsx(fontSize, color, "font-bold")}>
        {title}
      </Link>
    </button>
  );
};

export default MainButton;
