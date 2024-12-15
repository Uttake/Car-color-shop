import React from "react";
import HeaderLink from "./HeaderLink";
import Hamburger from "../components/Hamburger";

export const lists = [
  { title: "О нас", href: "/company" },
  { title: "Каталог", href: "/catalog" },
  { title: "Услуги", href: "/services" },
  { title: "Информация", href: "/info" },
  { title: "Контакты", href: "/contacts" },
];

const HeaderList = async () => {
  return (
    <>
      <nav>
        <ul className="flex gap-3 lg:hidden">
          {lists?.map((item, i) => (
            <HeaderLink item={item} key={i} />
          ))}
        </ul>
      </nav>
      <Hamburger isInitiallyOpen={false} />
    </>
  );
};

export default HeaderList;
