import React from "react";
import { lists } from "../header/HeaderList";
import HeaderLink from "../header/HeaderLink";
import HeaderInfo from "../header/HeaderInfo";
import clsx from "clsx";

type HamburgerMenuProps = {
  isInitiallyOpen?: boolean;
  setIsInitiallyOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerMenu = ({
  isInitiallyOpen,
  setIsInitiallyOpen,
}: HamburgerMenuProps) => {
  return (
    <div
      className={clsx(
        "absolute top-[175px] w-96 bg-black z-50 flex flex-col right-0 p-5 gap-10 sm:w-full transition ease-in-out",
        {
          "opacity-100 scale-100": isInitiallyOpen,
          "scale-0 opacity-0": !isInitiallyOpen,
        }
      )}
    >
      <nav>
        <ul className="flex flex-col gap-3 text-2xl">
          {lists?.map((item, i) => (
            <HeaderLink
              item={item}
              key={i}
              handleClick={() => setIsInitiallyOpen(false)}
            />
          ))}
        </ul>
      </nav>
      <HeaderInfo />
    </div>
  );
};

export default HamburgerMenu;
