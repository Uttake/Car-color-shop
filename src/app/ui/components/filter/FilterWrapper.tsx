"use client";
import React, { useState, useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./FilterWrapper.module.css";
import FilterPrice from "./FilterPrice";
import FilterStatus from "./FilterStatus";
const FilterComponent = ({
  lowestPries,
  highestPries,
}: {
  lowestPries: number;
  highestPries: number;
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    lowestPries || 0,
    highestPries || 0,
  ]);
  const [status, setStatus] = useState({ available: false, order: false });

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePriceChange = (index: number, value: number) => {
    setPriceRange((prevRange) => {
      const newRange = [...prevRange] as [number, number];
      newRange[index] = Math.max(lowestPries, Math.min(highestPries, value));
      return newRange;
    });
  };

  const handleApplyFilters = () => {
    const selectedStatuses = [];
    if (status.available) selectedStatuses.push("available");
    if (status.order) selectedStatuses.push("order");

    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());

    if (selectedStatuses.length > 0) {
      params.set("status", selectedStatuses.join(","));
    } else {
      params.delete("status");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleResetFilters = () => {
    setPriceRange([lowestPries, highestPries]);
    setStatus({ available: false, order: false });
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("status");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (statusParam) {
      const statuses = statusParam.split(",");
      setStatus({
        available: statuses.includes("available"),
        order: statuses.includes("order"),
      });
    }
  }, [searchParams]);

  return (
    <div className={styles.filterContainer}>
      <h4 className={styles.filterTitle}>Подбор параметров</h4>
      <FilterPrice
        {...{
          priceRange,
          handlePriceChange,
          lowestPries,
          highestPries,
          setPriceRange,
        }}
      />
      <FilterStatus {...{ status, setStatus }} />
      <div className="flex gap-2 px-3 py-7">
        <button
          className="text-white w-[114px] h-[40px] border-[4px] border-orange-brdr hover:bg-orange-brdr hover:text-white transition"
          onClick={(e) => {
            e.preventDefault();
            handleApplyFilters();
          }}
        >
          Показать
        </button>
        <button
          className="text-white w-[114px] h-[40px] border-[4px] border-orange-brdr hover:bg-orange-brdr hover:text-white transition"
          onClick={(e) => {
            e.preventDefault();
            handleResetFilters();
          }}
        >
          Сбросить
        </button>
      </div>

      <div className="p-3 bg-[#C53720] text-sm font-medium text-white">
        Подберём автоэмаль и лак именно для вашего автомобиля. Наша цель —
        предложить широкий ассортимент качественных материалов для кузовного
        ремонта.
      </div>
    </div>
  );
};

export default FilterComponent;
