import React, { Suspense } from "react";
import Breadcrumbs from "../ui/components/Breadcrumb";
import DemoSlider from "../ui/components/SliderSwiper";
import dataSlider from "@/app/_data/slider-data.json";
import Catalog from "../ui/components/catalog/Catalog";
import { getItemsByCategory, getRowCount } from "../utils/actions";
import { Pagination } from "../ui/components/Pagination";
import { CatalogItemType } from "../utils/definitions";
import clsx from "clsx";
import CatalogItem from "../ui/components/catalog/CatalogItem";
import AsideCategories from "../ui/components/AsideCategories";
import { unstable_noStore as noStore } from "next/cache";
const ITEMS_PER_PAGE = 7;
const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sort?: string;
  };
}) => {
  noStore();
  const query = searchParams?.query || "";

  const currentPage = Number(searchParams?.page) || 1;

  const sortParam =
    (searchParams &&
      Object.entries(searchParams).find(([key]) => key.startsWith("sort"))) ||
    "";

  const items = await getItemsByCategory({
    query,
    page: currentPage,
    sortParam: Array.isArray(sortParam) ? sortParam : undefined,
  });

  console.log(items);

  const totalPages = Math.ceil(
    Number((await getRowCount()).count) / ITEMS_PER_PAGE
  );

  return (
    <>
      <DemoSlider data={dataSlider} />
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
        <AsideCategories />
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
