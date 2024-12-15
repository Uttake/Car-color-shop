"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CallBackWrapper from "./Callback/CallbackWrapper";
const AboutItem = ({
  icon,
  title,
  type,
}: {
  icon: React.JSX.Element;
  title: string;
  type: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (typeof window !== "undefined") {
    Modal.setAppElement("body");
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="group flex flex-col items-center gap-4"
      >
        <div>{icon}</div>
        <span className="text-white underline group-hover:text-orange-brdr transition-all duration-300">
          {title}
        </span>
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        className={`relative rounded-lg shadow-lg w-[90%] max-w-[500px] mx-auto border-t-4 border-t-orange-brdr
        ${isOpen ? "animate-fadeIn" : "animate-fadeOut"}`}
      >
        {type === "callback" && <CallBackWrapper setIsOpen={setIsOpen} />}
      </Modal>
    </>
  );
};

export default AboutItem;
