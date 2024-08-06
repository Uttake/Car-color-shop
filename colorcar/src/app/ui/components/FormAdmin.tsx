import React from "react";
import Input from "./Input";

export default function FormAdmin() {
  return (
    <form className="flex flex-col gap-4">
      <Input name="name" label="Название" placeholder="Краска" />
      <Input name="description" label="Описание" placeholder="Краска желтая" />
      <Input name="price" label="Цена" placeholder="20 byn" />
      <input type="file" />
    </form>
  );
}
