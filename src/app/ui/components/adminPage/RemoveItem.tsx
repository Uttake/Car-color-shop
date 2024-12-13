"use client";
import { removeItem } from "@/app/utils/actions";
import { Button } from "@/components/ui/button";
import React from "react";

const RemoveItem = ({ id }: { id: string }) => {
  return (
    <div className="absolute top-2 left-2" onClick={() => removeItem(id)}>
      <Button className="bg-red-600">Удалить</Button>
    </div>
  );
};

export default RemoveItem;
