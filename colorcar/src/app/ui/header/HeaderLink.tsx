"use client";

import Link from "next/link";
import React from "react";

type HeaderLinks = {
  title: string;
  href: string;
};

const HeaderLink = ({
  item,
  handleClick,
}: {
  item: HeaderLinks;
  handleClick?: () => void;
}) => {
  return (
    <li
      className="text-white text-base sm:text-xl"
      key={item.title}
      onClick={handleClick}
    >
      <Link
        href={item.href}
        className="hover:border-b-4 hover:border-[#C53720] pb-1"
      >
        {item.title.toUpperCase()}
      </Link>
    </li>
  );
};

export default HeaderLink;
