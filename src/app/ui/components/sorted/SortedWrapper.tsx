"use client";
import React, { Suspense } from "react";
import SortedItem from "./SortedItem";
import { usePathname, useRouter } from "next/navigation";

const SortedWrapper = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleResetFilters = () => {
    router.replace(pathname);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-7 sm:text-sm sm:gap-3 sm:flex-wrap w-full">
      <h3 className="font-bold">Сортировать:</h3>
      <div className="flex justify-center items-center gap-7 flex-wrap">
        <div>
          <button onClick={handleResetFilters}>По умолчанию</button>
        </div>
        <Suspense>
          <SortedItem title="По цене" value="sortByprice" />
          <SortedItem title="По наличию" value="sortBystock" />
          <SortedItem title="По новизне" value="sortBynew" />
        </Suspense>
      </div>
    </div>
  );
};

export default SortedWrapper;
