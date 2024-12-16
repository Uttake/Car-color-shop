import React from "react";
import AsideFilterSkeleton from "../ui/components/skeletons/AsideFilterSkeleton";
import SortedSkeleton from "../ui/components/skeletons/SortedSkeleton";
import CatalogSkeleton from "../ui/components/skeletons/CatalogSkeleton";

const loading = () => {
  return (
    <div className="flex flex-wrap bg-[#EDEDED] max-w-[1440px] mx-auto pt-20">
      <AsideFilterSkeleton />
      <div className="bg-[#EDEDED] p-20 sm:p-2 xl:px-10 flex-1 flex flex-col justify-between">
        <SortedSkeleton />
        <CatalogSkeleton count={9} />
        <div className="flex items-center justify-between w-full  px-4 mt-3 bg-gray-200 animate-pulse">
          <div className=" h-16 w-[165px]"></div>
        </div>
      </div>
    </div>
  );
};

export default loading;
