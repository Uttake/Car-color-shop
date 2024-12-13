import React, { useEffect, useRef } from "react";
import styles from "./AsideModal.module.css";
import CloseIcon from "../../../_assets/close.svg";
import TelIcon from "../../../_assets/tel.svg";
import clsx from "clsx";

type AsideModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  width: number;
};
const AsideModal = ({
  isOpen,
  title,
  setIsOpen,
  children,
  width,
}: AsideModalProps) => {
  const handleOverlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };
  useEffect(() => {
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.style.overflowY = isOpen ? "hidden" : "auto";
    }
  }, [isOpen]);

  return (
    <>
      <div
        onClick={handleOverlay}
        className={clsx(styles.wrapper, {
          [styles.open]: isOpen,
        })}
      ></div>
      <div
        style={{ right: `-${isOpen ? 0 : width}px`, width: `${width}px` }}
        className={styles.asidePanel}
      >
        <div className={styles.asideHeader}>
          <div className="flex justify-between w-full gap-8">
            <div className={styles.telContainer}>
              <TelIcon stroke="white" width={42} height={42} />
            </div>
            <div className="flex flex-col">
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.subtitle}>
                Менеджеры компании с радостью ответят на ваши вопросы и помогут
                с выбором продукции.
              </p>
            </div>
            <button
              className={clsx(styles.closeAsideButton, "self-start")}
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon stroke="white" />
            </button>
          </div>
        </div>
        <div className={styles.asideContent}>{children}</div>
      </div>
    </>
  );
};

export default AsideModal;
