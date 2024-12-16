"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const SendTable = ({ items }: any) => {
  const handleSubmit = async () => {
    const response = await fetch("/api/telegramMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items.data),
    });

    if (response.ok) {
      console.log("Данные успешно отправлены!");
    } else {
      console.error("Ошибка при отправке данных!");
    }
  };
  return (
    <div>
      <Button onClick={handleSubmit}>Отправить данные</Button>
    </div>
  );
};

export default SendTable;
