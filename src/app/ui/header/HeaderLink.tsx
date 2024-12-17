"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import catalogData from "@/app/_data/catalog-data.json";
import ArrowIcon from "../../_assets/arrow.svg";
import { transform } from "next/dist/build/swc";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1022);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCatalog = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCatalogOpen((prev) => !prev);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.stopPropagation();
      setIsCatalogOpen(false);
      handleClick?.();
    }
  };

  return (
    <li
      className="text-white text-base sm:text-xl relative"
      key={item.title}
      onMouseEnter={
        !isMobile && item.title === "Каталог"
          ? () => setIsCatalogOpen(true)
          : undefined
      }
      onMouseLeave={
        !isMobile && item.title === "Каталог"
          ? () => setIsCatalogOpen(false)
          : undefined
      }
    >
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          scroll={false}
          onClick={handleLinkClick}
          className="pb-1 border-b-4 border-transparent hover:border-[#C53720]"
          style={
            `/${pathname.split("/")[1]}` === item.href
              ? { borderBottom: "4px solid #C53720" }
              : {}
          }
        >
          {item.title.toUpperCase()}
        </Link>
        {item.title === "Каталог" && isMobile && (
          <button
            onClick={toggleCatalog}
            className="ml-2 text-white focus:outline-none"
            aria-label="Toggle Catalog"
          >
            <ArrowIcon
              stroke="white"
              className="transition-all duration-300"
              style={{
                transform: isCatalogOpen ? "rotate(-90deg)" : "rotate(90deg)",
              }}
            />
          </button>
        )}
      </div>
      {item.title === "Каталог" && (
        <ul
          className={`absolute ${
            isMobile
              ? "top-full left-0 bg-black w-full"
              : "left-0 top-[120%] bg-black w-60"
          } text-white shadow-lg z-[1000] transition-all duration-300 ${
            isCatalogOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {catalogData.map((category) => (
            <li key={category.title} className="group relative">
              <Link
                href={category.link}
                onClick={handleLinkClick}
                className="block px-4 py-2 hover:bg-[#C53720]"
              >
                {category.title}
              </Link>
              {category.subcategories && !isMobile && (
                <ul className="absolute left-full top-0 bg-black shadow-lg hidden group-hover:block">
                  {category.subcategories.map((sub) => (
                    <li key={sub.title}>
                      <Link
                        href={sub.link}
                        onClick={handleLinkClick}
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
