"use client";
import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { lists } from "../header/HeaderList";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const Breadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  let pathNames = paths.split("/").filter((path) => path);
  let itemName: string;

  console.log(pathNames);
  lists.map((item) => {
    if (paths.includes(item.href)) {
      itemName = item.title;
    } else {
      pathNames;
    }
  });

  return (
    <div className={`bg-white ${pathNames.length === 0 ? "hidden" : "block"}`}>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={"/"}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink = itemName;
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>{itemLink}</Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
