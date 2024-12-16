"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Close from "../../_assets/close.svg";
const ImageContainer = ({
  src,
  title,
  solo,
}: {
  src: string;
  title: string;
  solo: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (typeof window !== "undefined") {
    Modal.setAppElement("body");
  }

  useEffect(() => {
    if (isOpen && solo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div className="mb-4 h-[230px]">
      <Image
        src={src}
        alt={title}
        width={264}
        height={500}
        loading="lazy"
        onClick={openModal}
        className="max-w-full max-h-full object-contain cursor-pointer"
      />
      <Modal
        isOpen={isOpen && solo}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        className={`relative bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-[500px] mx-auto 
        ${isOpen ? "animate-fadeIn" : "animate-fadeOut"}`}
      >
        <button onClick={closeModal} className="absolute top-2 right-2 ">
          <Close stroke="black" />
        </button>
        <Image
          src={src}
          width={340}
          height={340}
          alt={title}
          loading="eager"
          className="max-w-full max-h-[500px] object-contain mx-auto"
        />
      </Modal>
    </div>
  );
};

export default ImageContainer;
