import React from "react";
import { Input } from "@/components/ui/input";
import { UserType } from "./OrderForm";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormTooltip from "../tooltips/Tooltip";

type InputTypes = {
  name: keyof UserType;
  title: string;
  form: UseFormReturn<UserType>;
  type: string;
  isLoading: boolean;
  required: boolean;
};

const OrderInput = ({
  name,
  title,
  form,
  type,
  isLoading,
  required,
}: InputTypes) => {
  const errorMessage =
    form.formState.isSubmitted && form.formState.errors[name]?.message;

  return (
    <FormTooltip tooltip={errorMessage || ""}>
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{required ? `${title} *` : `${title}`}</FormLabel>
            <FormControl>
              <Input
                className="h-[40px] w-full border-4 border-[#1D1D1D] focus:border-black focus-visible:ring-transparent"
                type={type}
                disabled={isLoading}
                placeholder=""
                autoFocus
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </FormTooltip>
  );
};

export default OrderInput;
