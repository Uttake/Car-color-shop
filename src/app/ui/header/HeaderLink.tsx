"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import catalogData from "@/app/_data/catalog-data.json";

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
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const handleMouseEnter = () => setIsCatalogOpen(true);
  const handleMouseLeave = () => setIsCatalogOpen(false);
  return (
    <li
      className="text-white text-base sm:text-xl relative"
      key={item.title}
      onClick={handleClick}
      onMouseEnter={item.title === "Каталог" ? handleMouseEnter : undefined}
      onMouseLeave={item.title === "Каталог" ? handleMouseLeave : undefined}
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
      {item.title === "Каталог" && (
        <ul
          className={`absolute left-0 top-[120%] bg-black text-white shadow-lg w-60 z-[1000] 
                transition-all duration-300 ${
                  isCatalogOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
        >
          {catalogData.map((category) => (
            <li key={category.title} className="group relative">
              <Link
                href={category.link}
                className="block px-4 py-2 hover:bg-[#C53720]"
              >
                {category.title}
              </Link>
              {category.subcategories && (
                <ul className="absolute left-full top-0 bg-black shadow-lg hidden group-hover:block">
                  {category.subcategories.map((sub) => (
                    <li key={sub.title}>
                      <Link
                        href={sub.link}
                        className="block px-4 py-2 hover:bg-[#C53720]"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default HeaderLink;
