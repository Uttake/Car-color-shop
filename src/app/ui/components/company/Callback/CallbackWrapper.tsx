import React from "react";
import styles from "./CallbackWrapper.module.css";
import TelIcon from "../../../../_assets/tel.svg";
import CloseIcon from "../../../../_assets/close.svg";
import clsx from "clsx";
import CallbackForm from "./CallBackForm";

const CallBackWrapper = ({
  setIsOpen,
  title = "Задать вопрос",
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}) => {
  return (
    <div className={styles.asideHeader}>
      <div className="flex justify-between w-full gap-8 pt-5 pr-6 md:pt-2">
        <div className={styles.telContainer}>
          <TelIcon stroke="white" width={42} height={42} />
        </div>
        <div className="flex flex-col">
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            Менеджеры компании с радостью ответят на ваши вопросы.
          </p>
        </div>
        <button
          className={clsx(styles.closeAsideButton, "self-start")}
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon stroke="white" />
        </button>
      </div>
      <div className=" bg-white text-black pt-6 text-base font-medium  max-w-[554px] w-full px-6 pb-5">
        <CallbackForm />
      </div>
    </div>
  );
};

export default CallBackWrapper;
