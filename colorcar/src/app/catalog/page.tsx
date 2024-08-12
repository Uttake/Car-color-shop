import React from "react";
import CatalogItem from "../ui/components/catalog/CatalogItem";
import { getCatalogItems } from "../utils/actions";
import { CatalogItemType } from "../utils/definitions";
import Search from "../ui/components/Search";

const Catalog = async () => {
  let items = await getCatalogItems();
  return (
    <section className="bg-[#EDEDED] p-20">
      <div className="wrapper">
        <Search />
        <div className="flex gap-6 justify-center flex-wrap">
          {items &&
            items.map((item: CatalogItemType) => (
              <CatalogItem
                title={item.title}
                image={item.images}
                price={item.price}
              />
            ))}
        </div>
        <div>Каталог недоступен</div>
      </div>
    </section>
  );
};

export default Catalog;
