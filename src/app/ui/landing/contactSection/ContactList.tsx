import React from "react";
import tel from "@/app/_assets/tel.svg";
import time from "@/app/_assets/time.svg";
import mail from "@/app/_assets/mail.svg";
import adress from "@/app/_assets/adress.svg";

let contactList = [
  { img: tel, title: "+375293888293", type: "tel" },
  { img: mail, title: "workmail@example.com", type: "mailto" },
  { img: adress, title: "улица Турова, 3к1" },
];

const ContactList = () => {
  return (
    <ul>
      {contactList.map((item) => (
        <li
          key={item.title}
          className="flex items-center text-white gap-4 mb-4 last:mb-0 text-base font-medium"
        >
          <item.img width={20} height={20} />
          {item.type ? (
            <a href={`${item.type}:${item.title.replace(/[-\(\)\s]/g, "")}`}>
              <span>{item.title}</span>
            </a>
          ) : (
            <span>{item.title}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
