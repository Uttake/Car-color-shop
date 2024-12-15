import Image from "next/image";
import React from "react";
import MainButton from "../components/MainButton";

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

const FooterContact = async () => {
  return (
    <div>
      {footerContactData.map((item) => (
        <div key={item.title} className="flex gap-2 mb-3 last:mb-0">
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
