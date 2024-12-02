import Image from "next/image";
import React from "react";
import MainButton from "../MainButton";
import ShopCardButton from "../ShopCardButtons";
import { CataloItemsType } from "@/app/utils/definitions";
import clsx from "clsx";
import Price from "../Price";
import { Button } from "@/components/ui/button";
import ImageContainer from "../ImageContainer";

const CatalogItem = async ({
  title,
  price,
  images,
  id,
  solo,
  description,
  isAdmin,
  discount,
}: CataloItemsType) => {
  return (
    <>
      <div
        className={clsx(
          "border-4 px-5 py-8 bg-white cursor-pointer h-full max-h-[546px] hover:border-orange-brdr transition duration-300 sm:w-full has-[:disabled]:border-green-500",
          {
            " xl:justify-center flex flex-wrap wrapper justify-between m-auto ":
              solo,
          }
        )}
      >
        {isAdmin && <Button>Редактирование</Button>}
        <ImageContainer src={images} title={title} />
        <div>
          <h2 className=" text-[#C53720] text-xl font-medium mb-11">{title}</h2>
          {solo && <div className="my-6">{description}</div>}
          <Price price={price} discount={discount ? discount : 0} />
          <ShopCardButton
            title={title}
            price={price}
            images={images}
            id={id}
            discount={discount}
          />

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
    </>
  );
};

export default CatalogItem;
