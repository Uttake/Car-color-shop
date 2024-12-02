import React, { Suspense } from "react";
import Breadcrumbs from "../ui/components/Breadcrumb";
import DemoSlider from "../ui/components/SliderSwiper";
import dataSlider from "@/app/_data/slider-data.json";
import Catalog from "../ui/components/catalog/Catalog";
import { getCatalogItems, getRowCount } from "../utils/actions";
import { Pagination } from "../ui/components/Pagination";
import { CatalogItemType } from "../utils/definitions";
import clsx from "clsx";
import CatalogItem from "../ui/components/catalog/CatalogItem";
const ITEMS_PER_PAGE = 7;
const page = async ({
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
      <Catalog>
        <div
          className={clsx(
            {
              "flex justify-center gap-6 flex-wrap py-5":
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
    </>
  );
};

export default page;
