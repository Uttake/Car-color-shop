"use client";
import React, { useEffect, useState } from "react";
import MainButton from "../components/MainButton";
import Counter from "../components/Count";
import ShopIcon from "@/app/_assets/shop.svg";
import Basket from "../components/basket/Basket";
import { useBasket } from "../components/BasketContext";
import Modal from "react-modal";
import CallBackWrapper from "../components/company/Callback/CallbackWrapper";

const HeaderInfo = () => {
  const { cardOpen, setCardOpen } = useBasket();
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  return (
    <div className="flex justify-center items-center gap-5 relative">
      <MainButton
        title="ЗАКАЗАТЬ ЗВОНОК"
        fontSize="text-xs"
        color="text-white"
        maxW="w-[168px]"
        hgt="h-[40px]"
        href="/"
        onClick={() => setModalOpen(true)}
      />
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Callback modal"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[102]"
        className={`relative rounded-lg shadow-lg w-[90%] max-w-[500px] mx-auto border-t-4 border-t-orange-brdr z-[101]
        ${modalOpen ? "animate-fadeIn" : "animate-fadeOut"}`}
      >
        <CallBackWrapper setIsOpen={setModalOpen} />
      </Modal>
      <button className="flex" onClick={() => setCardOpen(!cardOpen)}>
        <ShopIcon />
        <Counter className="" />
      </button>
      <Basket isCartOpen={cardOpen} setCartOpen={setCardOpen} />
    </div>
  );
};

export default HeaderInfo;
