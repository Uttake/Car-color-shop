"use client";
import React, { useState } from "react";
import catalogData from "@/app/_data/catalog-data.json";
import DropdownMenu from "./CategoryList/CategoryList";

const AsideCategories = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  return (
    <div className="max-w-[264px] w-full pt-20 tablet:max-w-full">
      <div id="dropdown" className="h-full">
        <DropdownMenu categoryOpen={categoryOpen} data={catalogData} />
      </div>
    </div>
  );
};

export default AsideCategories;
