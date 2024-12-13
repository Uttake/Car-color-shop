import Breadcrumbs from "@/app/ui/components/Breadcrumb";
import DemoSlider from "@/app/ui/components/sliders/SliderSwiper";
import React, { Suspense } from "react";
import dataSlider from "@/app/_data/slider-data.json";
import {
  getItemsByCategory,
  getPriceRange,
  getRowCount,
} from "@/app/utils/actions";
import AsideCategories from "@/app/ui/components/AsideCategories";
import Catalog from "@/app/ui/components/catalog/Catalog";
import clsx from "clsx";
import CatalogItem from "@/app/ui/components/catalog/CatalogItem";
import { Pagination } from "@/app/ui/components/Pagination";
import { CatalogItemType } from "@/app/utils/definitions";
import { description, getUsd } from "@/app/utils";
import { unstable_noStore as noStore } from "next/cache";
import FilterComponent from "@/app/ui/components/filter/FilterWrapper";
import ItemPerView from "@/app/ui/components/ItemPerView";
const ITEMS_PER_PAGE = 9;
const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    query: string;
    page?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    status?: string;
    rowPerPage?: string;
  };
}) => {
  noStore();

  const course = await getUsd();
  const query = searchParams?.query || "";
  const slug = params.slug;
  const currentPage = Number(searchParams?.page) || 1;
  const status = searchParams?.status || "";

  const minPrice = +(
    parseFloat(searchParams?.minPrice || "0") / course
  ).toFixed(2);
  const maxPrice = +(
    parseFloat(searchParams?.maxPrice || "0") / course
  ).toFixed(2);

  const sortParam =
    Object.entries(searchParams).find(([key, value]) =>
      key.startsWith("sort")
    ) || "";

  const rowPerPage = Number(searchParams?.rowPerPage) || ITEMS_PER_PAGE;

  const items = await getItemsByCategory({
    query,
    slug,
    page: currentPage,
    sortParam: Array.isArray(sortParam) ? sortParam : undefined,
    minPrice,
    maxPrice,
    row: Number(rowPerPage),
    status: status.split(","),
  });

  const totalPages = Math.ceil(
    Number((await getRowCount({ slug })).count) / ITEMS_PER_PAGE
  );

  const priceRange = await getPriceRange();

  const lowestPries = +(priceRange.minPrice * course).toFixed(2);
  const highestPries = +(priceRange.maxPrice * course).toFixed(2);
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
          {
            label: description[slug],
            href: `/catalog/${slug}`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-wrap bg-[#EDEDED] max-w-[1440px] mx-auto pb-5">
        <div className="flex flex-col gap-5 md:w-full">
          <AsideCategories />
          <Suspense fallback={null}>
            <FilterComponent
              lowestPries={lowestPries}
              highestPries={highestPries}
            />
          </Suspense>
        </div>
        <Catalog>
          <div
            className={clsx(
              {
                "flex justify-center gap-6 flex-wrap py-5 flex-1":
                  items?.data?.length! <= 2,
              },
              {
                "grid grid-cols-block gap-6 py-5": items?.data?.length! > 2,
              }
            )}
          >
            {items?.error ? (
              <div className="mt-4 text-center">
                Нет товаров для выбранного фильтра
              </div>
            ) : (
              items?.data && (
                <>
                  {items?.data.map((item: CatalogItemType) => (
                    <CatalogItem key={item.id} {...item} />
                  ))}
                  {!items?.data.length && <div>Такого товара нет</div>}
                </>
              )
            )}
          </div>

          <div className="flex items-center justify-between w-full bg-white px-4">
            <Suspense fallback={null}>
              <Pagination totalPages={totalPages} />
            </Suspense>
            <Suspense fallback={null}>
              <ItemPerView />
            </Suspense>
          </div>
        </Catalog>
      </div>
    </>
  );
};

export default page;
