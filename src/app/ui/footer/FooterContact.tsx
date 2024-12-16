import Image from "next/image";
import React from "react";
import MainButton from "../components/MainButton";
import clsx from "clsx";

const footerContactData = [
  {
    tumb: "/phone.svg",
    title: "+375 (29) 738-92-64",
    type: "tel",
  },
  {
    tumb: "/mail.svg",
    title: "example@gmail.com",
    type: "mailto",
  },
];

const FooterContact = async ({ main }: { main?: boolean }) => {
  return (
    <div
      className={clsx({
        "flex justify-center items-start gap-4 sm:flex-wrap": main,
      })}
    >
      {footerContactData.map((item) => (
        <div key={item.title} className={clsx("flex gap-2 mb-3 last:mb-0")}>
          <Image src={item.tumb} alt={item.title} width={20} height={20} />
          <h3 className=" text-base text-white">
            <a href={`${item.type}:${item.title.replace(/[-\(\)\s]/g, "")}`}>
              {item.title}
            </a>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default FooterContact;
