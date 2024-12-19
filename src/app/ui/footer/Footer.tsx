import Image from "next/image";
import React from "react";
import FooterList from "./FooterList";
import FooterContact from "./FooterContact";

const Footer = async () => {
  return (
    <footer className="bg-black py-8">
      <div className="wrapper flex w-full justify-between flex-wrap md:gap-8 md:px-3">
        <div>
          <Image
            src={"/logo.webp"}
            alt="logo"
            width={120}
            height={58}
            className=" mb-12"
            loading="lazy"
          />
          <h3 className=" text-base opacity-50 text-white font-medium">
            © 2024 Tarcolor.
            <br />
            Все права защищены.
          </h3>
        </div>
        <FooterList />
        <FooterContact />
      </div>
    </footer>
  );
};

export default Footer;
