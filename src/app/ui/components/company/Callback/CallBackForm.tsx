"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { UserSchema, UserType } from "../../order/OrderForm";
import OrderInput from "../../order/OrderInput";
import Spinner from "../../Spinner";
import { Textarea } from "@/components/ui/textarea";

const CallbackForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const form = useForm<UserType>({
    defaultValues: {
      name: "",
      tel: "",
      email: "",
      services: "",
      message: "",
    },
    resolver: zodResolver(UserSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: UserType) => {
    setIsLoading(true);
    try {
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
          email: data.email || undefined,
          order: undefined,
          services: data.services || undefined,
          message: data.message || undefined,
          callback: true,
        };

        if (!data.email) {
          delete orderData.email;
        }

        const response = await fetch("/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          console.log("Заявка успешно отправлена");
          setIsLoading(false);
          toast.success("Заявка успешно отправлена");
          form.reset();
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
    <div>
      <Form {...form}>
        <form
          className="space-y-4 sm:max-w-sm w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <OrderInput
            key="name"
            required
            form={form}
            name="name"
            title="Имя:"
            type="string"
            isLoading={isLoading}
          />
          <OrderInput
            key="tel"
            required
            form={form}
            name="tel"
            title="Телефон:"
            type="tel"
            isLoading={isLoading}
          />
          <OrderInput
            key="email"
            required={false}
            form={form}
            name="email"
            type="email"
            title="E-mail:"
            isLoading={isLoading}
          />
          <Textarea
            {...form.register("message")}
            id="message"
            disabled={isLoading}
            rows={2}
            placeholder="Сообщение:"
            className=" border-4 border-black focus:border-black focus-visible:ring-transparent"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="max-w-[168px] w-full h-[40px] bg-transparent text-[#c53720] border-4 border-[#c53720] hover:bg-[#c53720] hover:text-white transition duration-300 rounded-none"
          >
            {isLoading ? (
              <Spinner fill="fill-orange-brdr" size="sm" />
            ) : (
              "Отправить"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CallbackForm;
