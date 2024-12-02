import React from "react";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
const AdminInput = ({
  value,
  register,
  title,
  defaultValue,
}: {
  value: string;
  register: any;
  title: string;
  defaultValue: string;
}) => {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">{title}</Label>
      <Textarea
        {...register(`${value}`)}
        placeholder={title}
        id="message"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default AdminInput;
