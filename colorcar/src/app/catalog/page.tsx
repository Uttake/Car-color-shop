"use server";
import React from "react";
import CatalogItem from "../ui/components/catalog/CatalogItem";
import { getCatalogItems, searchSubmit } from "../utils/actions";
import { CatalogItemType } from "../utils/definitions";
import Search from "../ui/components/Search";

const Catalog = async () => {
  let items = await getCatalogItems();

  const onSubmit = async (formData: FormData) => {
    const data = await searchSubmit(formData);
    return data;
  };
  let serachItems = onSubmit();
  return (
    <section className="bg-[#EDEDED] p-20">
      <div className="wrapper">
        <Search onSubmitBtn={onSubmit} />
        <div className="grid grid-cols-block gap-6">
          {items &&
            items.map((item: CatalogItemType) => (
              <CatalogItem
                key={item.id}
                title={item.title}
                images={item.images}
                price={item.price}
                id={item.id}
              />
            ))}{" "}
          <div className="flex-grow"></div>
        </div>

        <div>Каталог недоступен</div>
      </div>
    </section>
  );
};

export default Catalog;
