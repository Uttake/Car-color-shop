import Breadcrumbs from "@/app/ui/components/Breadcrumb";
import DemoSlider from "@/app/ui/components/sliders/SliderSwiper";
import React from "react";
import dataSlider from "@/app/_data/slider-data.json";
import { getItemsByCategory, getRowCount } from "@/app/utils/actions";
import AsideCategories from "@/app/ui/components/AsideCategories";
import Catalog from "@/app/ui/components/catalog/Catalog";
import clsx from "clsx";
import CatalogItem from "@/app/ui/components/catalog/CatalogItem";
import { Pagination } from "@/app/ui/components/Pagination";
import { CatalogItemType } from "@/app/utils/definitions";
import { description } from "@/app/utils";
import { unstable_noStore as noStore } from "next/cache";
const ITEMS_PER_PAGE = 7;
const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { query: string; page?: string; sort?: string };
}) => {
  noStore();
  const query = searchParams?.query || "";
  const slug = decodeURIComponent(params.slug);
  const sortParam =
    Object.entries(searchParams).find(([key, value]) =>
      key.startsWith("sort")
    ) || "";

  const currentPage = Number(searchParams?.page) || 1;
  const items = await getItemsByCategory({
    query,
    slug,
    page: currentPage,
    sortParam: Array.isArray(sortParam) ? sortParam : undefined,
  });

  const totalPages = Math.ceil(
    Number((await getRowCount()).count) / ITEMS_PER_PAGE
  );
  return (
    <>
      {/* <DemoSlider data={dataSlider} /> */}
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
      <div className="flex flex-wrap bg-[#EDEDED] max-w-[1440px] mx-auto">
        <AsideCategories />
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
              <div>Извините произошла ошибка </div>
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
          {items?.data?.length! > 1 && <Pagination totalPages={totalPages} />}
        </Catalog>
      </div>
    </>
  );
};

export default page;
