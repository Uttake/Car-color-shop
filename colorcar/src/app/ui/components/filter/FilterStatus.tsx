import React, { useState } from "react";
import styles from "./FilterWrapper.module.css";
import ArrowIcon from "../../../_assets/arrow.svg";
import clsx from "clsx";

interface FilterStatusProps {
  status: { available: boolean; order: boolean };
  setStatus: React.Dispatch<
    React.SetStateAction<{ available: boolean; order: boolean }>
  >;
}
const FilterStatus = ({ status, setStatus }: FilterStatusProps) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const toggleStatusSection = () => {
    setIsStatusOpen((prev) => !prev);
  };

  return (
    <div className={styles.filterSection}>
      <h5 className={styles.filterSubtitle} onClick={toggleStatusSection}>
        {" "}
        <span>Статус</span>{" "}
        <ArrowIcon
          stroke="white"
          style={{
            transform: isStatusOpen ? "rotate(-90deg)" : "rotate(90deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </h5>
      <div
        className={clsx(styles.statusWrapper, {
          [styles.open]: isStatusOpen,
        })}
      >
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={status.available}
            onChange={(e) =>
              setStatus({ ...status, available: e.target.checked })
            }
            className={styles.checkbox}
          />
          В наличии
        </label>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={status.order}
            onChange={(e) => setStatus({ ...status, order: e.target.checked })}
            className={styles.checkbox}
          />
          Под заказ
        </label>
      </div>
    </div>
  );
};

export default FilterStatus;
