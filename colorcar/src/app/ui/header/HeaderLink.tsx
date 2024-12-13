"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

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
  const pathname = usePathname();
  return (
    <li
      className="text-white text-base sm:text-xl"
      key={item.title}
      onClick={handleClick}
    >
      <Link
        href={item.href}
        scroll={false}
        className="hover:border-b-4 hover:border-[#C53720] pb-1"
        style={
          `/${pathname.split("/")[1]}` === item.href
            ? { borderBottom: "4px solid #C53720" }
            : {}
        }
      >
        {item.title.toUpperCase()}
      </Link>
    </li>
  );
};

export default HeaderLink;
