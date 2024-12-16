import React from "react";

const SortedSkeleton = () => {
  return (
    <div>
      <div className="bg-gray-200 animate-pulse h-10 w-full mx-auto mb-5"></div>
      <div className="flex items-center gap-7 sm:text-sm sm:gap-3 sm:flex-wrap w-full bg-gray-300 animate-pulse h-6">
        <div className="bg-gray-200 animate-pulse h-6 "></div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-gray-200 animate-pulse h-6"></div>
        ))}
      </div>
      <div className="flex items-center justify-between w-full  px-4 mt-3 bg-gray-200 animate-pulse">
        <div className=" h-16 w-[165px]"></div>
      </div>
    </div>
  );
};

export default SortedSkeleton;
