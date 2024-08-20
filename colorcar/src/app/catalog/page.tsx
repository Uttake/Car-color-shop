import React, { Suspense } from "react";
import CatalogItem from "../ui/components/catalog/CatalogItem";
import { getCatalogItems } from "../utils/actions";
import { CatalogItemType } from "../utils/definitions";
import Search from "../ui/components/Search";

const Catalog = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";

  const items = await getCatalogItems(query);

  return (
    <section className="bg-[#EDEDED] p-20">
      <div className="wrapper">
        <Search />
        <div className="grid grid-cols-block gap-6">
          {items.error ? (
            <div>Извините произошла ошибка </div>
          ) : (
            items.data && (
              <>
                {items.data.map((item: CatalogItemType) => (
                  <CatalogItem
                    key={item.id}
                    title={item.title}
                    images={item.images}
                    price={item.price}
                    id={item.id}
                  />
                ))}
                {!items.data.length && <div>Такого товара нет</div>}
              </>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
