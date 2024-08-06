import React from "react";
import HeaderLink from "./HeaderLink";
import Hamburger from "../components/Hamburger";

type headerList = {
  title: string;
  href: string;
};
const HeaderList = () => {
  let lists: headerList[] = [
    { title: "КОМПАНИЯ", href: "/company" },
    { title: "КАТАЛОГ", href: "/catalog" },
    { title: "УСЛУГИ", href: "/services" },
    { title: "ИНФОРМАЦИЯ", href: "/info" },
    { title: "КОНТАКТЫ", href: "/contacts" },
  ];
  return (
    <nav>
      <ul className="flex gap-3 xl:hidden">
        {lists?.map((item, i) => (
          <HeaderLink item={item} key={i} />
        ))}
          {/* <Hamburger /> */}
      </ul>
    </nav>
  );
};

export default HeaderList;
