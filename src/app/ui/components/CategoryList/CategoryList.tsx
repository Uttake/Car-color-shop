"use client";
import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import clsx from "clsx";
import Link from "next/link";
import ArrowIcon from "../../../_assets/arrow.svg";
import { usePathname } from "next/navigation";

type MenuData = {
  title: string;
  link?: string;
  category?: string;
  subcategories?: MenuData[];
};

type DropdownMenuProps = {
  categoryOpen: boolean;
  data: MenuData[];
};

const DropdownMenu = ({ data }: DropdownMenuProps): JSX.Element | null => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [submenuOpen, setSubmenuOpen] = useState<string>("");
  const pathname = usePathname();

  console.log(submenuOpen);

  useEffect(() => {
    if (pathname && pathname !== "") {
      const category = pathname.split("/")[2] || "";
      setSubmenuOpen(category);
      setActiveCategory(category);
    }
  }, [pathname]);

  const handleChange = (str: string) => {
    setSubmenuOpen((prev) => (prev.includes(str) ? "" : str));
  };

  return (
    <div className={styles.menu}>
      {data.map((category) => (
        <div key={category.title}>
          <div
            className={styles.menuItem}
            style={{
              backgroundColor:
                category.category === activeCategory.split("-")[0]
                  ? "#C53720"
                  : "",
            }}
          >
            <div className="flex items-center justify-between p-2">
              <Link
                href={category.link || ""}
                scroll={false}
                className={clsx(
                  styles.menuLink,
                  " text-lg font-bold text-white flex-1"
                )}
              >
                {category.title}
              </Link>

              {category.subcategories && (
                <button
                  onClick={(e) => {
                    handleChange(category.category || "");
                  }}
                  aria-label="submenu"
                >
                  <ArrowIcon
                    width={25}
                    height={25}
                    stroke="white"
                    className={clsx("w-3.5 h-3.5 ms-2.5 transition", {
                      "rotate-90": submenuOpen.includes(
                        category.category || ""
                      ),

                      "rotate-0": submenuOpen !== category.category,
                    })}
                  />
                </button>
              )}
            </div>
          </div>
          {category.subcategories &&
            submenuOpen.split("-")[0] === category.category && (
              <div
                className={`${styles.submenu} ${
                  submenuOpen.split("-")[0] === category.category
                    ? styles.submenuOpen
                    : ""
                }`}
              >
                {category.subcategories.map((subcategory) => (
                  <Link
                    href={subcategory.link || ""}
                    key={subcategory.title}
                    scroll={false}
                    style={{
                      textDecoration:
                        activeCategory === subcategory.category
                          ? "underline"
                          : "",
                    }}
                    className={clsx(styles.submenuItem, "text-sm font-medium")}
                  >
                    {subcategory.title}
                  </Link>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
