import Link from "next/link";
import React from "react";

type headerLinks = {
  title: string;
  href: string;
};

const HeaderLink = ({ item }: { item: headerLinks }) => {
  return (
    <li className=" text-white text-base sm:text-xl" key={item.title}>
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
