import React from "react";
import Breadcrumbs from "../ui/components/Breadcrumb";

let path = [
  { label: "Главная", href: "/" },
  {
    label: "Контакты",
    href: `/company`,
    active: true,
  },
];

const page = async () => {
  return (
    <>
      <Breadcrumbs breadcrumbs={path} />
      <div>Hello</div>
    </>
  );
};

export default page;
