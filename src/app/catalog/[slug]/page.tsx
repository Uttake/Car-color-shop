import Breadcrumbs from "@/app/ui/components/Breadcrumb";
import React, { Suspense } from "react";
import { getItemsByCategory, getPriceRange } from "@/app/utils/data";
import AsideCategories from "@/app/ui/components/AsideCategories";
import Catalog from "@/app/ui/components/catalog/Catalog";
import clsx from "clsx";
import CatalogItem from "@/app/ui/components/catalog/CatalogItem";
import { Pagination } from "@/app/ui/components/Pagination";
import { CatalogItemType } from "@/app/utils/definitions";
import { translateCategories, getUsd } from "@/app/utils";
import { unstable_noStore as noStore } from "next/cache";
import FilterComponent from "@/app/ui/components/filter/FilterWrapper";
import Head from "next/head";
import Script from "next/script";
import { headers } from "next/headers";
import CatalogSkeleton from "@/app/ui/components/skeletons/CatalogSkeleton";
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

  const totalPages = items.count ? Math.ceil(items.count / rowPerPage) : 1;

  const priceRange = await getPriceRange();

  const lowestPries = +(priceRange.minPrice * course).toFixed(2);
  const highestPries = +(priceRange.maxPrice * course).toFixed(2);

  const title = `Каталог товаров ${query ? `по запросу: ${query}` : ""}`;
  const description = `Просмотр каталога товаров на нашем сайте${
    query ? ` для запроса: ${query}` : ""
  }. Найдите лучшие товары по выгодным ценам.`;
  const currentUrl = new URL(
    headers().get("host") || "",
    "https://yourwebsite.com"
  ).href;

  const searchParamsKey = JSON.stringify(searchParams);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={"/logo.webp"} />{" "}
        <meta property="og:url" content={currentUrl} />{" "}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={"/logo.webp"} />
      </Head>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Главная", href: "/" },
          {
            label: "Каталог",
            href: `/catalog`,
            active: true,
          },
          {
            label: translateCategories[slug],
            href: `/catalog/${slug}`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-wrap bg-[#EDEDED] max-w-[1440px] mx-auto pb-5">
        <div className="flex flex-col gap-5 tablet:w-full">
          <AsideCategories />
          <Suspense fallback={null}>
            <FilterComponent
              lowestPries={lowestPries}
              highestPries={highestPries}
            />
          </Suspense>
        </div>
        <Catalog>
          <div className="flex items-center justify-between w-full bg-white px-4 mt-3 flex-wrap">
            <Suspense fallback={null}>
              <Pagination totalPages={totalPages} />
            </Suspense>
            {/* <Suspense fallback={null}>
              <ItemPerView />
            </Suspense> */}
          </div>
          <Suspense
            key={searchParamsKey}
            fallback={<CatalogSkeleton count={9} />}
          >
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
          </Suspense>

          <div className="flex items-center justify-between w-full bg-white px-4">
            <Suspense fallback={null}>
              <Pagination totalPages={totalPages} />
            </Suspense>
            {/* <Suspense fallback={null}>
              <ItemPerView />
            </Suspense> */}
          </div>
        </Catalog>
      </div>
      <Script
        id="jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: Array.isArray(items.data)
              ? items.data.map((item, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: item.title,
                  item: {
                    "@type": "Product",
                    name: item.title,
                    image: item.image,
                    description: item.description,
                    priceCurrency: "BYN",
                    price: item.price * course,
                    url: `https://yourwebsite.com/product/${item.id}`,
                  },
                }))
              : [],
          }),
        }}
      />
    </>
  );
};

export default page;
