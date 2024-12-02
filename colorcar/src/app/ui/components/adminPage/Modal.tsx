"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AdminForm from "./AdminForm";

import CloseTag from "../../../_assets/close.svg";
import { CataloItemsType } from "@/app/utils/definitions";
import clsx from "clsx";

const ModalWrapper = ({
  item,
  update,
  className,
  title,
  query,
}: {
  item: CataloItemsType;
  update: boolean;
  className?: string;
  title?: string;
  query: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={clsx(
          { "absolute top-2 right-2": update },
          { "top-0": !update }
        )}
      >
        <Button onClick={() => setIsOpen(!isOpen)}>{title}</Button>
      </div>
      {isOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="fixed z-[101] bg-white p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] shadow-lg rounded"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-5">
                {update ? "Редактирование товара" : "Добавление товара"}
              </h2>
              <button className="self-start" onClick={() => setIsOpen(false)}>
                {" "}
                <CloseTag stroke="#000" />
              </button>
            </div>
            <div>
              <AdminForm item={item} update={update} query={query} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalWrapper;
