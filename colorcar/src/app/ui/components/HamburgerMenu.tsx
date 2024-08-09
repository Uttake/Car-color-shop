import React from "react";
import { lists } from "../header/HeaderList";
import HeaderLink from "../header/HeaderLink";
import HeaderInfo from "../header/HeaderInfo";
import clsx from "clsx";

type HamburgerMenuProps = {
  isInitiallyOpen?: boolean;
};

const HamburgerMenu = ({ isInitiallyOpen }: HamburgerMenuProps) => {
  console.log(isInitiallyOpen);
  return (
    <div
      className={clsx(
        " fixed top-[120px] w-96 bg-black z-50 flex flex-col p-5 gap-10 translate-x-80 opacity-0 sm:w-full transition-all ",
        { " translate-x-[-320px] absolute opacity-100": isInitiallyOpen }
      )}
    >
      <nav>
        <ul className="flex flex-col gap-3 text-2xl">
          {lists?.map((item, i) => (
            <HeaderLink item={item} key={i} />
          ))}
        </ul>
      </nav>
      <HeaderInfo />
    </div>
  );
};

export default HamburgerMenu;
