import React from "react";
import Breadcrumbs from "../ui/components/Breadcrumb";
import Title from "../ui/components/Title";
import AboutBlock from "../ui/components/company/AboutBlock";
import AboutItemWrapper from "../ui/components/company/AboutItemWrapper";

let path = [
  { label: "Главная", href: "/" },
  {
    label: "О нас",
    href: `/company`,
    active: true,
  },
];

const page = async () => {
  return (
    <>
      <Breadcrumbs breadcrumbs={path} />
      <section className="bg-about bg-no-repeat bg-cover py-20 relative lg:px-3 md:text-sm">
        <div className="absolute top-0 left-0 w-full h-full bg-overlay z-10"></div>
        <div className="wrapper relative z-20 ">
          <Title title="О нас" color="#ffff" />
          <div className="flex flex-wrap justify-between xl:gap-3">
            <AboutBlock />
            <AboutItemWrapper />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
