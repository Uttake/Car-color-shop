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
        {items.length === 0 && <div>Каталог недоступен</div>}
      </div>
    </section>
  );
};

export default Catalog;
