"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OrderInput from "./OrderInput";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const UserSchema = z.object({
  name: z.string().min(3, { message: "Имя должно быть не короче 3 символов" }),
  tel: z
    .string()
    .min(1, { message: "Телефон обязателен для заполнения" })
    .regex(/^\+375(25|29|33|44)\d{7}$/, {
      message: "Введите корректный номер телефона в формате +375",
    }),
  email: z
    .string()
    .optional()
    .refine(
      (val) =>
        val === "" || /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(val!),
      {
        message: "Введите корректный email",
      }
    ),
  services: z.string().optional(),
  message: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;

const OrderForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<UserType>({
    defaultValues: {
      name: "",
      tel: "",
      email: "",
    },
    resolver: zodResolver(UserSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: UserType) => {
    setIsLoading(true);
    try {
      const cardData = JSON.parse(localStorage.getItem("basket")!);
      if (!cardData.length) {
        toast.error("Корзина пуста");
        setIsLoading(false);
        return;
      }
      if (!executeRecaptcha) {
        toast.error("Ошибка при загрузке ReCaptcha");
        return;
      }

      const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

      const captchaResponse = await fetch("/api/recaptchaSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gRecaptchaToken }),
      });

      const res = await captchaResponse.json();
      if (res.success) {
        const orderData = {
          ...data,
          order: cardData,
          email: data.email || undefined,
        };

        if (!data.email) {
          delete orderData.email;
        }

        const response = await fetch("api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          setIsLoading(false);
          toast.success("Заказ успешно оформлен");
          form.reset();
          console.log("Заказ успешно отправлен");
        }
      } else {
        setIsLoading(false);
        toast.error("Проверьте, что вы не робот");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Произошла ошибка");
      console.log("Ошибка", error);
    } finally {
      setIsLoading(false);
      localStorage.setItem("basket", JSON.stringify([]));
    }
  };

  return (
    <div className="pt-6 text-base font-medium  max-w-[554px] w-full">
      <h2 className=" mb-6">Получатель </h2>
      <Form {...form}>
        <form
          className="space-y-6 sm:max-w-sm w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <OrderInput
            key="name"
            form={form}
            name="name"
            required
            title="Имя:"
            type="string"
            isLoading={isLoading}
          />
          <OrderInput
            key="tel"
            form={form}
            name="tel"
            required
            title="Телефон:"
            type="tel"
            isLoading={isLoading}
          />
          <OrderInput
            key="email"
            form={form}
            required={false}
            name="email"
            type="email"
            title="E-mail:"
            isLoading={isLoading}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="max-w-[168px] w-full h-[40px] bg-transparent text-[#c53720] border-4 border-[#c53720] hover:bg-[#c53720] hover:text-white transition duration-300 rounded-none"
          >
            {isLoading ? (
              <Spinner fill="fill-orange-brdr" size="sm" />
            ) : (
              "Заказать"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
