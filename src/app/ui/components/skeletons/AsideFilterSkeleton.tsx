import React from "react";

const AsideFilterSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 max-w-[264px] w-full tablet:w-full tablet:max-w-full pt-20">
      <div className="bg-gray-200 animate-pulse py-3 flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-gray-300 h-11"></div>
        ))}
      </div>
      <div className="py-3 bg-gray-200 animate-pulse flex flex-col tablet:w-full">
        <div className="h-10 bg-gray-300"></div>
        <div className="h-10 bg-gray-300"></div>
        <div className="h-10 bg-gray-300"></div>
        <div className="flex gap-2 px-3 py-7 h-10 bg-gray-300 ">
          <div className="h-10 bg-gray-300"></div>
          <div className="h-10 bg-gray-300"></div>
        </div>
        <div className="h-36 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default AsideFilterSkeleton;
