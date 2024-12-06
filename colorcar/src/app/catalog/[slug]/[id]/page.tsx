import Breadcrumbs from "@/app/ui/components/Breadcrumb";
import CatalogItem from "@/app/ui/components/catalog/CatalogItem";
import { getCatalogItem } from "@/app/utils/actions";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const item = await getCatalogItem(id);

  const path = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog/#catalog" },
    {
      label: item?.title,
      href: `/catalog/${id}`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={path} />
      <div className="bg-[#EDEDED] flex justify-center py-20 ">
        <div className=" basis-1/2 md:basis-full md:px-3">
          <CatalogItem
            key={item.id}
            title={item.title}
            images={item.images}
            price={item.price}
            id={item.id}
            discount={item.discount}
            fulldescription={item.fulldescription}
            solo={true}
            description={item.description}
          />
        </div>
      </div>
    </>
  );
};

export default page;
