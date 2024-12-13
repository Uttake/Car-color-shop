"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CloseTag from "../../../_assets/close.svg";

const ModalInfo = ({
  title,
  width,
  children,
}: {
  title?: string;
  width: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <Button onClick={() => setIsOpen(!isOpen)}>{title}</Button>
      </div>
      {isOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`fixed z-[101] bg-white p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] shadow-lg rounded`}
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-5">{title}</h2>
              <button className="self-start" onClick={() => setIsOpen(false)}>
                {" "}
                <CloseTag stroke="#000" />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalInfo;
