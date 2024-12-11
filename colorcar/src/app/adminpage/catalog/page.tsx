import React from "react";
import Catalog from "../../ui/components/catalog/Catalog";
import { getRowCount, getItemsByCategory, logout } from "../../utils/actions";
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
import ModalInfo from "@/app/ui/components/modalInfo/ModalInfo";
import InfoForm from "@/app/ui/components/modalInfo/InfoForm";
import InfoContainer from "@/app/ui/components/modalInfo/InfoContainer";
import SendTable from "@/app/ui/components/modalInfo/SendTable";

let reserveItems: CatalogItemType = {
  id: "f32ea770-b402-11ef-a129-2b66bd5bce59",
  title: "EASICOAT Эмаль (краска) акриловая ",
  description: "2K AUDI - VW LO7Q 1л, БЕЗ ОТВЕРДИТЕЛЯ ",
  images:
    "https://invnbdbustikwbnttmdr.supabase.co/storage/v1/object/public/Products%20images/f32ea770-b402-11ef-a129-2b66bd5bce59.png",
  price: 51.38,
  article: null,
  discount: 0,
  category: "laki",
  subcategory: "''",
  fulldescription:
    '"<p><span style=\\"color: rgb(31, 31, 31)\\"><strong>Акриловая эмаль служит для окраски кузовов и пластмассовых деталей автомобиля. Эмаль обладает приятным блеском, эластичностью, прочностью и повышенной укрывистостью. Быстро сохнет.</strong></span></p>"',
  avaiblity: true,
  new: false,
};

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
  const sortParam =
    (searchParams &&
      Object.entries(searchParams).find(([key]) => key.startsWith("sort"))) ||
    "";

  const items = await getItemsByCategory({
    query,
    page: currentPage,
    sortParam: Array.isArray(sortParam) ? sortParam : undefined,
  });

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
        {/* <AsideCategories /> */}
        <Catalog>
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <ModalWrapper
                item={reserveItems}
                update={false}
                className=""
                title="Добавить товар"
                query={query}
              />
              <ModalInfo title="Добавить информацию" width="900px">
                <InfoForm />
              </ModalInfo>
              <ModalInfo title="Изменить информацию" width="900px">
                <InfoContainer />
              </ModalInfo>
              <SendTable items={items} />
            </div>
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
