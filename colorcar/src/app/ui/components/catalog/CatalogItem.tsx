import Image from "next/image";
import React from "react";
import MainButton from "../MainButton";
import ShopCardButton from "../ShopCardButtons";
import { CataloItemsType } from "@/app/utils/definitions";
import clsx from "clsx";

const CatalogItem = ({
  title,
  price,
  images,
  id,
  solo,
  description,
}: CataloItemsType) => {
  return (
    <div
      className={clsx(
        "border-4 px-5 py-8 bg-white cursor-pointer hover:border-orange-brdr transition duration-300 sm:w-full has-[:disabled]:border-green-500",
        {
          " xl:justify-center flex flex-wrap wrapper justify-between m-auto":
            solo,
        }
      )}
    >
      <div className=" mb-4">
        <Image src={images} alt={title} width={264} height={500} />
      </div>
      <div>
        <h2 className=" text-[#C53720] text-xl font-medium mb-11">{title}</h2>
        {solo && <div className="my-6">{description}</div>}
        <div className=" text-[#1D1D1D] text-3xl mb-5 font-bold">
          {price} BYN
        </div>
        <ShopCardButton title={title} price={price} images={images} id={id} />

        {!solo && (
          <MainButton
            maxW="max-w-[224px]"
            hgt="h-[40px]"
            title="ПОДРОБНЕЕ"
            color="text-[#c53720]"
            href={`/catalog/${id}`}
            hover="group-hover:text-white"
          />
        )}
      </div>
    </div>
  );
};

export default CatalogItem;
