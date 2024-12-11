import React from "react";
import Breadcrumbs from "../ui/components/Breadcrumb";
import Catalog from "../ui/components/catalog/Catalog";
import {
  getItemsByCategory,
  getPriceRange,
  getRowCount,
} from "../utils/actions";
import { Pagination } from "../ui/components/Pagination";
import { CatalogItemType } from "../utils/definitions";
import clsx from "clsx";
import CatalogItem from "../ui/components/catalog/CatalogItem";
import AsideCategories from "../ui/components/AsideCategories";
import { unstable_noStore as noStore } from "next/cache";
import FilterComponent from "../ui/components/filter/FilterWrapper";
import { getUsd } from "../utils";
const ITEMS_PER_PAGE = 7;
const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    status?: string;
  };
}) => {
  noStore();

  const course = await getUsd();
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const status = searchParams?.status || "";

  const minPrice = +(
    parseFloat(searchParams?.minPrice || "0") / course
  ).toFixed(2);
  const maxPrice = +(
    parseFloat(searchParams?.maxPrice || "0") / course
  ).toFixed(2);

  const sortParam =
    (searchParams &&
      Object.entries(searchParams).find(([key]) => key.startsWith("sort"))) ||
    "";

  const priceRange = await getPriceRange();

  const items = await getItemsByCategory({
    query,
    page: currentPage,
    sortParam: Array.isArray(sortParam) ? sortParam : undefined,
    minPrice,
    maxPrice,
    status: status.split(","),
  });

  const lowestPries = +(priceRange.minPrice * course).toFixed(2);
  const highestPries = +(priceRange.maxPrice * course).toFixed(2);

  const totalPages = Math.ceil(
    Number((await getRowCount()).count) / ITEMS_PER_PAGE
  );

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Главная", href: "/" },
          {
            label: "Каталог",
            href: `/catalog`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-wrap bg-[#EDEDED] max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-5">
          <AsideCategories />
          <FilterComponent
            lowestPries={lowestPries}
            highestPries={highestPries}
          />
        </div>
        <Catalog>
          <div
            className={clsx(
              {
                "flex justify-center gap-6 flex-wrap py-5 flex-1":
                  items.data?.length! <= 2,
              },
              {
                "grid grid-cols-block gap-6 py-5": items.data?.length! > 2,
              }
            )}
          >
            {items.error ? (
              <div>Извините произошла ошибка </div>
            ) : (
              items.data && (
                <>
                  {items.data.map((item: CatalogItemType) => (
                    <CatalogItem key={item.id} {...item} />
                  ))}
                  {!items.data.length && <div>Такого товара нет</div>}
                </>
              )
            )}
          </div>
          {items.data?.length! > 1 && <Pagination totalPages={totalPages} />}
        </Catalog>
      </div>
    </>
  );
};
export const dynamic = "force-dynamic";

export default page;
