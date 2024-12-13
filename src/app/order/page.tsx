import React from "react";
import Breadcrumbs from "../ui/components/Breadcrumb";
import OrderInfo from "../ui/components/order/OrderInfo";
import OrderForm from "../ui/components/order/OrderForm";
import SwiperWrapper from "../ui/components/sliders/SwiperWrapper";
import { getUsd } from "../utils";
import { unstable_noStore as NoStore } from "next/cache";
const page = async () => {
  NoStore();
  const course = await getUsd();
  return (
    <>
      <SwiperWrapper />
      <Breadcrumbs
        breadcrumbs={[
          { label: "Главная", href: "/" },
          {
            label: "Оформление заказа",
            href: `/order`,
            active: true,
          },
        ]}
      />
      <section className=" bg-[#ededed]" id="order">
        <div className="wrapper py-20">
          <h1 className="text-4xl font-bold uppercase mb-9">
            Оформление заказа
          </h1>
          <div className="flex justify-between flex-wrap gap-8">
            <OrderForm />
            <OrderInfo course={course} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
