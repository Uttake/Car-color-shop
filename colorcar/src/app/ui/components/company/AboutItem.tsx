"use client";
import React, { useState } from "react";
import AsideModal from "../asideModal/AsideModal";

const AboutItem = ({
  icon,
  title,
  onClick,
}: {
  icon: React.JSX.Element;
  title: string;
  onClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
          onClick();
        }}
        className="group flex flex-col items-center gap-4 "
      >
        {icon}
        <span className="text-white underline group-hover:text-orange-brdr transition-all duration-300">
          {title}
        </span>
      </button>
      <AsideModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={title}
        width={500}
      >
        <div></div>
      </AsideModal>
    </>
  );
};

export default AboutItem;
