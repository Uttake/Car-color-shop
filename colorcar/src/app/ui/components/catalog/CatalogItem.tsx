import React from "react";
import MainButton from "../MainButton";
import ShopCardButton from "../ShopCardButtons";
import { CataloItemsType } from "@/app/utils/definitions";
import clsx from "clsx";
import Price from "../Price";
import { Button } from "@/components/ui/button";
import ImageContainer from "../ImageContainer";
import styles from "./CatalogItem.module.css";
import DOMPurify from "isomorphic-dompurify";
import { fixStyleString } from "@/app/utils";

const CatalogItem = async ({
  title,
  price,
  images,
  id,
  solo,
  description,
  fulldescription,
  isAdmin,
  discount,
  category,
  avaiblity,
}: CataloItemsType) => {
  const sanitizedDescription = DOMPurify.sanitize(
    fixStyleString(fulldescription || ""),
    {
      ALLOWED_ATTR: ["class", "style", "id", "title"],
    }
  );
  return (
    <>
      <div
        className={clsx(
          `relative border-4 px-5 flex flex-col justify-between py-8 bg-white cursor-pointer h-full hover:border-orange-brdr transition duration-300 sm:w-full has-[:disabled]:border-green-500 ${styles.catalog}`,
          {
            " xl:justify-center flex flex-wrap wrapper justify-between m-auto flex-row ":
              solo,
          },
          {
            "border-orange-brdr has-[:disabled]:border-orange-brdr": !avaiblity,
          }
        )}
        style={{ flexDirection: solo ? "row" : "column" }}
      >
        {!avaiblity && (
          <div className="absolute top-0 right-0 bg-[#C53720] text-white px-5 py-2">
            Под заказ
          </div>
        )}
        <ImageContainer src={images} title={title} solo={solo} />
        <div className={clsx(styles["catalog-item"], "flex-1")}>
          <h2
            className={clsx(
              "text-[#C53720] text-base font-medium mb-5 overflow-hidden text-ellipsis max-h-12",
              {
                solo: "mb-0",
              }
            )}
          >
            {title}
          </h2>
          <Price price={price} discount={discount ? discount : 0} />
          <ShopCardButton
            title={title}
            price={price}
            images={images}
            id={id}
            discount={discount}
            avaiblity={avaiblity}
          />

          {!solo && (
            <MainButton
              maxW="max-w-[224px]"
              hgt="h-[40px]"
              title="ПОДРОБНЕЕ"
              classes={clsx({ "border-alphablack": !avaiblity })}
              color={avaiblity ? "text-[#C53720]" : "text-alphablack"}
              href={avaiblity ? `/catalog/${category}/${id}` : "#"}
              hover={clsx(
                { "group-hover:text-white": avaiblity },
                {
                  "group-hover:appearance-none pointer-events-none": !avaiblity,
                }
              )}
            />
          )}
        </div>
        {solo && (
          <div
            className="w-full mt-3 flex flex-col gap-2"
            dangerouslySetInnerHTML={{
              __html: fixStyleString(sanitizedDescription),
            }}
          ></div>
        )}
      </div>
    </>
  );
};

export default CatalogItem;
