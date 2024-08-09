"use client";

import React from "react";
import Input from "./Input";
import MainButton from "./MainButton";
import { postData } from "@/app/utils/actions";
import { useFormStatus } from "react-dom";
import Spinner from "./Spinner";

export default function FormAdmin() {
  return (
    <form action={postData} className="flex flex-col gap-4">
      <Input name="name" label="Название" placeholder="Краска" />
      <Input name="description" label="Описание" placeholder="Краска желтая" />
      <Input name="price" label="Цена" placeholder="20 byn" />
      <input type="file" />
      <ButtonForm />
    </form>
  );
}

const ButtonForm: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`flex justify-center items-center h-12 border-4 border-[#d42e12] w-full cursor-pointer hover:bg-[#d42e12] ${
        pending ? "bg-[#d42e12]" : ""
      }  transition-all`}
    >
      {pending ? <Spinner fill="fill-orange-brdr" size="sm" /> : "Отправить"}
    </button>
  );
};
