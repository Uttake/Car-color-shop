"use client";
import React, { useState } from "react";
import styles from "./FilterWrapper.module.css";
import clsx from "clsx";
import ArrowIcon from "../../../_assets/arrow.svg";
import Slider from "react-slider";
import TrackIcon from "../../../_assets/track.svg";
interface FilterPriceProps {
  priceRange: [number, number];
  handlePriceChange: (index: number, value: number) => void;
  lowestPries: number;
  highestPries: number;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const FilterPrice = ({
  priceRange,
  handlePriceChange,
  lowestPries,
  highestPries,
  setPriceRange,
}: FilterPriceProps) => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const togglePriceSection = () => {
    setIsPriceOpen((prev) => !prev);
  };
  return (
    <div
      className={clsx(styles.filterSection)}
      aria-label="Фильтровать по цене"
    >
      <h5 className={styles.filterSubtitle} onClick={togglePriceSection}>
        <span>Цена</span>{" "}
        <ArrowIcon
          stroke="white"
          style={{
            transform: isPriceOpen ? "rotate(-90deg)" : "rotate(90deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </h5>
      <div
        className={clsx(styles.sliderWrapper, { [styles.open]: isPriceOpen })}
      >
        <div className="flex mb-5">
          <input
            type="number"
            aria-label="Фильтровать по цене от"
            value={priceRange[0]}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (!isNaN(newValue)) {
                handlePriceChange(0, newValue);
              }
            }}
            className={styles.priceInput}
            step="any"
          />
          <input
            type="number"
            aria-label="Фильтровать по цене до"
            value={priceRange[1]}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (!isNaN(newValue)) {
                handlePriceChange(1, newValue);
              }
            }}
            className={styles.priceInput}
            step="any"
          />
        </div>
        <div className={clsx(styles.sliderValues, "text-xs text-white")}>
          <span>{lowestPries}</span>
          <span>{highestPries}</span>
        </div>
        <Slider
          className={styles.slider}
          min={lowestPries || 10}
          max={highestPries || 1000}
          value={priceRange}
          onChange={(newRange: [number, number]) => {
            setPriceRange([
              Math.max(lowestPries, Math.min(highestPries, newRange[0])),
              Math.max(lowestPries, Math.min(highestPries, newRange[1])),
            ]);
          }}
          renderThumb={(props) => {
            const { key, ...restProps } = props;
            return (
              <div key={key} {...restProps} className={styles.sliderThumb}>
                <TrackIcon className={styles.trackIcon} />
              </div>
            );
          }}
          trackClassName="example-track"
          ariaLabel={["minPrice", "maxPrice"]}
        />
      </div>
    </div>
  );
};

export default FilterPrice;
