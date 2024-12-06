"use client";
import React from "react";

export default function MapY() {
  return (
    <div className=" basis-1/2 md:basis-full md:h-[300px]">
      <iframe
        src={`https://yandex.by/map-widget/v1/?display-text=Автоэмали%2C%20автомобильные%20краски&ll=30.363762%2C53.925503&mode=search&oid=91161796048&ol=biz&sctx=ZAAAAAgBEAAaKAoSCXgJTn0gXT5AEY16iEZ39kpAEhIJTS7GwDqOTz8Rcm9%2Bw0SDND8iBgABAgMEBSgKOABAoacNSAFqAnVhnQHNzMw9oAEAqAEAvQHoQ3wUggIbKChjYXRlZ29yeV9pZDooMTg0MTA1MzEyKSkpigIJMTg0MTA1MzEykgIAmgIMZGVza3RvcC1tYXBz&sll=30.363762%2C53.925503&sspn=0.000963%2C0.000313&text=%7B"text"%3A"Автоэмали%2C%20автомобильные%20краски"%2C"what"%3A%5B%7B"attr_name"%3A"category_id"%2C"attr_values"%3A%5B"184105312"%5D%7D%5D%7D&z=21`}
        width="100%"
        height="100%"
        frameBorder="1"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}
