"use client";
import clsx from "clsx";
import React, { useState } from "react";
import catalogData from "@/app/_data/catalog-data.json";
import DropdownMenu from "./CategoryList/CategoryList";

const AsideCategories = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  return (
    <div className="max-w-[264px] w-full py-20 md:max-w-full">
      <div id="dropdown" className="h-full">
        <DropdownMenu categoryOpen={categoryOpen} data={catalogData} />
      </div>
    </div>
  );
};

export default AsideCategories;
