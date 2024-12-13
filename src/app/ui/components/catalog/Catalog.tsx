import React, { Suspense } from "react";
import Search from "../Search";
import SortedWrapper from "../sorted/SortedWrapper";

export const Catalog = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-[#EDEDED] p-20 sm:p-2 xl:px-10 flex-1 flex flex-col justify-between">
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Search />
        </Suspense>
        <SortedWrapper />
        {children}
      </div>
    </section>
  );
};

export default Catalog;
