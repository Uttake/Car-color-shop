import React from "react";
import Search from "../Search";

export const Catalog = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-[#EDEDED] p-20 sm:p-2">
      <div className="wrapper">
        <Search />
        {children}
      </div>
    </section>
  );
};

export default Catalog;
