import React from "react";
import Catalog from "../../ui/components/catalog/Catalog";
import { getRowCount, getCatalogItems, logout } from "../../utils/actions";
import clsx from "clsx";
import CatalogItem from "../../ui/components/catalog/CatalogItem";
import { CatalogItemType } from "../../utils/definitions";
import { Pagination } from "../../ui/components/Pagination";
import ModalWrapper from "../../ui/components/adminPage/Modal";
import { createClient } from "@/app/utils/supabase/serverSupabaseClient";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logout from "@/app/ui/components/adminPage/Logout";
import RemoveItem from "@/app/ui/components/adminPage/RemoveItem";
import AsideCategories from "@/app/ui/components/AsideCategories";

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

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/adminpage");
  }

  return (
    <>
      <div className="flex flex-wrap bg-[#EDEDED] max-w-[1440px] mx-auto">
        <AsideCategories />
        <Catalog>
          <div className="flex justify-between">
            <ModalWrapper
              item={items.data![0]}
              update={false}
              className=""
              title="Добавить товар"
              query={query}
            />
            <Logout />
          </div>
          <div
            className={clsx(
              {
                "flex justify-center gap-6 flex-wrap py-5 relative":
                  items.data?.length! <= 2,
              },
              {
                "grid grid-cols-block gap-6 py-5 relative":
                  items.data?.length! > 2,
              }
            )}
          >
            {items.error ? (
              <div>Извините произошла ошибка </div>
            ) : (
              items.data && (
                <>
                  {items.data.map((item: CatalogItemType) => (
                    <div key={item.id} className="relative">
                      <CatalogItem key={item.id} {...item} solo={false} />
                      <RemoveItem id={item.id} />
                      <ModalWrapper
                        item={item}
                        update={true}
                        title="Изменить"
                        query={query}
                      />
                    </div>
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

export default page;
