import React from "react";
import s from "./servicesSection.module.css";
import clsx from "clsx";

type servicesItems = {
  id: string;
  title: string;
  subtitle: string;
  image: React.JSX.Element;
};
const ServicesItem = ({ item }: { item: servicesItems }) => {
  return (
    <div key={item.id} className={clsx(s.item)}>
      <div className={s.itemImage}>{item.image}</div>
      <div>
        <h2 className="text-lg font-bold text-white mb-4 md:text-base">
          {item.title}
        </h2>
        <h3 className=" font-medium text-base text-white md:text-sm">
          {item.subtitle}
        </h3>
      </div>
    </div>
  );
};

export default ServicesItem;
