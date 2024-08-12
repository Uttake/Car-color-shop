import Image from "next/image";
import React from "react";
import Counter from "../Counter";

export type CataloItemsType = {
  title: string;
  price: string;
  image: string;
};

const CatalogItem = ({ title, price, image }: CataloItemsType) => {
  return (
    <div>
      <div>
        <Image src={image} alt={title} />
      </div>
      <h2>{title}</h2>
      <div>{price}</div>
      <Counter />
    </div>
  );
};

export default CatalogItem;
