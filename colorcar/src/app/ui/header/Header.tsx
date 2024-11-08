import React from "react";
import logo from "@/../public/logo.png";
import Image from "next/image";
import HeaderList from "./HeaderList";
import HeaderInfo from "./HeaderInfo";
import Link from "next/link";
const Header = async () => {
  return (
    <>
      <header className=" max-w-6xl m-auto flex items-center justify-between xl:px-5 bg-opacity-75 bg-black">
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={120} height={58} />
        </Link>
        <HeaderList />
        <div className="lg:hidden">
          <HeaderInfo />
        </div>
      </header>
    </>
  );
};

export default Header;
