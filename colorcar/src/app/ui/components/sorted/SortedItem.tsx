"use client";
import React, { useState, useEffect } from "react";
import SortedIco from "../../../_assets/sorted.svg";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SortedItem = ({ title, value }: { title: string; value: string }) => {
  const [sortedValue, setSortedValue] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setIsActive(params.has(value));
  }, [searchParams, value]);

  const handleChange = () => {
    const newSortedValue = !sortedValue;
    setSortedValue(newSortedValue);

    const params = new URLSearchParams(searchParams);
    for (const [key] of params.entries()) {
      if (key.startsWith("sort")) {
        params.delete(key);
      }
    }

    params.set(value, `${newSortedValue}`);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className={`flex gap-2 items-center cursor-pointer ${
        isActive ? "text-orange-brdr" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        handleChange();
      }}
    >
      {title}
      <SortedIco
        className="transition-transform"
        style={{ transform: sortedValue ? "rotate(180deg)" : "" }}
        stroke={isActive ? "#C53720" : "#1D1D1D"}
      />
    </div>
  );
};

export default SortedItem;
