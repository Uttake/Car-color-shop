"use client";
import React, { useState } from "react";
import styles from "./Category.module.css";
import clsx from "clsx";
import Link from "next/link";

type MenuData = {
  title: string;
  link?: string;
  subcategories?: MenuData[];
};

type DropdownMenuProps = {
  categoryOpen: boolean;
  data: MenuData[];
};

const DropdownMenu = ({
  categoryOpen,
  data,
}: DropdownMenuProps): JSX.Element | null => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [submenuOpen, setSubmenuOpen] = useState<string>("");

  const handleChange = (str: string) => {
    if (submenuOpen === str) {
      setSubmenuOpen("");
    } else {
      setSubmenuOpen(str);
    }
  };

  const handleMouseEnter = (title: string) => {
    setHoveredCategory(title);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return categoryOpen ? (
    <div className={styles.menu}>
      {data.map((category) => (
        <>
          <div
            key={category.title}
            className={styles.menuItem}
            onMouseEnter={() => handleMouseEnter(category.title)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center justify-between">
              <Link
                href={category.link || ""}
                className={clsx(
                  styles.menuLink,
                  " text-base text-white flex-1"
                )}
              >
                {category.title}
              </Link>

              {category.subcategories && (
                <button onClick={() => handleChange(category.title)}>
                  <svg
                    className={clsx("w-3.5 h-3.5 ms-2.5 transition", {
                      "-rotate-180": category.title === submenuOpen,
                      "rotate-0": !submenuOpen,
                    })}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          {category.subcategories && submenuOpen === category.title && (
            <div
              className={`${styles.submenu} ${
                submenuOpen === category.title ? styles.submenuOpen : ""
              }`}
            >
              {category.subcategories.map((subcategory) => (
                <a
                  href={subcategory.link}
                  key={subcategory.title}
                  className={clsx(styles.submenuItem, "text-sm font-medium")}
                >
                  {subcategory.title}
                </a>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  ) : null;
};

export default DropdownMenu;
