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
          `border-4 px-5 flex flex-col justify-between py-8 bg-white cursor-pointer h-full  hover:border-orange-brdr transition duration-300 sm:w-full has-[:disabled]:border-green-500 ${styles.catalog}`,
          {
            " xl:justify-center flex flex-wrap wrapper justify-between m-auto flex-row":
              solo,
          }
        )}
        style={{ flexDirection: solo ? "row" : "column" }}
      >
        {isAdmin && <Button>Редактирование</Button>}
        <ImageContainer src={images} title={title} />
        <div className={styles["catalog-item"]}>
          <h2
            className={clsx("text-[#C53720] text-xl font-medium mb-11", {
              solo: "mb-0",
            })}
          >
            {title}
          </h2>
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
              href={`/catalog/${category}/${id}`}
              hover="group-hover:text-white"
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
