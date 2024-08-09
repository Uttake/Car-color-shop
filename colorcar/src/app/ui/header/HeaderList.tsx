import React from "react";
import HeaderLink from "./HeaderLink";
import Hamburger from "../components/Hamburger";

export type headerList = {
  title: string;
  href: string;
};

export const lists: headerList[] = [
  { title: "КОМПАНИЯ", href: "/company" },
  { title: "КАТАЛОГ", href: "/catalog" },
  { title: "УСЛУГИ", href: "/services" },
  { title: "ИНФОРМАЦИЯ", href: "/info" },
  { title: "КОНТАКТЫ", href: "/contacts" },
];
const HeaderList = () => {
  return (
   <>
     <nav>
      <ul className="flex gap-3 lg:hidden">
        {lists?.map((item, i) => (
          <HeaderLink item={item} key={i} />
        ))}
        
      </ul>
    </nav>
  <Hamburger isInitiallyOpen={false}/>
   </>
  );
};

export default HeaderList;
