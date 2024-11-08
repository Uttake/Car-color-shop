import React from "react";
import Breadcrumbs from "../ui/components/Breadcrumb";
import OrderInfo from "../ui/components/order/OrderInfo";
import OrderForm from "../ui/components/order/OrderForm";
import dataSlider from "@/app/_data/slider-data.json";
import DemoSlider from "../ui/components/SliderSwiper";
const page = async () => {
  return (
    <>
      <DemoSlider data={dataSlider} />
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
      <section className=" bg-[#ededed]">
        <div className="wrapper py-20">
          <h1 className="text-4xl font-bold uppercase mb-9">
            Оформление заказа
          </h1>
          <div className="flex justify-between flex-wrap gap-8">
            <OrderForm />
            <OrderInfo />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
