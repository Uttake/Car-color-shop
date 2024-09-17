import React, { Suspense } from "react";
import CatalogItem from "../ui/components/catalog/CatalogItem";
import { getCatalogItems, getRowCount } from "../utils/actions";
import { CatalogItemType } from "../utils/definitions";
import Search from "../ui/components/Search";
import { Pagination } from "../ui/components/Pagination";

const ITEMS_PER_PAGE = 7;

const Catalog = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const items = await getCatalogItems(query, ITEMS_PER_PAGE);
  const totalPages = Math.ceil(
    Number((await getRowCount()).count) / ITEMS_PER_PAGE
  );

  console.log(totalPages);
  return (
    <section className="bg-[#EDEDED] p-20 sm:p-2">
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
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
};

export default Catalog;
