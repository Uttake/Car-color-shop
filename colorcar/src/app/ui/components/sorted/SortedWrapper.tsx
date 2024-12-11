import React from "react";
import SortedItem from "./SortedItem";

const SortedWrapper = () => {
  return (
    <div className="flex items-center gap-7 sm:text-sm sm:gap-3">
      <h3 className=" font-bold">Сортировать по:</h3>
      <div className="flex justify-center items-center gap-7 ">
        <SortedItem title="По цене" value="sortByprice" />
        <SortedItem title="По наличию" value="sortBystock" />
      </div>
    </div>
  );
};

export default SortedWrapper;
