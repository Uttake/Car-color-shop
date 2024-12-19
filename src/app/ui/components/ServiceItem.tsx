import { ServiceItemType } from "@/app/utils/definitions";
import React from "react";

const ServiceItem = ({ data }: { data: ServiceItemType[] }) => {
  return (
    <div className="flex flex-col gap-5">
      {data.map((item, index) => (
        <div key={index}>
          <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
          <p className="mb-2 last:mb-0">{item.desc}</p>
          <ul>
            {item.list &&
              item.list.map((el) => (
                <li className="mb-2 last:mb-0" key={el.title}>
                  <span className="font-bold">{el.title}</span> {el.desc}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServiceItem;
