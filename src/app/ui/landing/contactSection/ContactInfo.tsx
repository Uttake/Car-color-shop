import React from "react";
import ContactList from "./ContactList";
import Time from "@/app/_assets/time.svg";
const ContactInfo = () => {
  return (
    <div className="bg-[#1D1D1D] py-20 px-16 basis-1/2 md:py-10 md:px-6 flex flex-col justify-center items-start md:flex-1">
      <h3 className="text-white text-2xl font-medium mb-9 md:text-lg">
        Как с нами связаться
      </h3>
      <div>
        <ContactList />
        <h3 className="text-white text-2xl font-medium mb-9 md:text-lg mt-8">
          Режим работы
        </h3>

        <div className="text-white flex gap-4">
          <Time />
          <span>Пн. – Вс.: с 9:00 до 18:00</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
