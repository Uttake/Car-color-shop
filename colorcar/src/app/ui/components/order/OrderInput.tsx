import React from "react";
import { Input } from "@/components/ui/input";
import { UserType } from "./OrderForm";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type InputTypes = {
  name: keyof UserType;
  title: string;
  form: UseFormReturn<UserType>;
  type: string;
  isLoading: boolean;
};

const OrderInput = ({ name, title, form, type, isLoading }: InputTypes) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
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
  );
};

export default OrderInput;
