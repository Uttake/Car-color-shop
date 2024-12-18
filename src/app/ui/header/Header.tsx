import React from "react";
import Image from "next/image";
import HeaderList from "./HeaderList";
import HeaderInfo from "./HeaderInfo";
import Link from "next/link";
const Header = async () => {
  return (
    <>
      <header className=" bg-black">
        <div className="max-w-6xl m-auto flex items-center justify-between xl:px-5 bg-opacity-75">
          <Link href={"/"} scroll={false}>
            <Image
              src={"/logo.webp"}
              alt="logo"
              width={120}
              height={58}
              priority={true}
            />
          </Link>

          <HeaderList />
          <div className="lg:hidden">
            <HeaderInfo />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
