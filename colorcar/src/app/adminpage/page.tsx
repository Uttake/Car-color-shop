"use client";
import React, { useActionState, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login, signup } from "../utils/actions";

const Authorization = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formSchema = z.object({
    email: z
      .string()
      .min(2, "Логин не должен быть короче 2 символов")
      .email("Введите корректный email"),
    password: z.string().min(5, "Пароль не должен быть короче 5 символов"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    login(data);
  };

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-center min-h-screen md:px-3 bg-slate-800">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg relative z-50">
          <h2 className="text-2xl font-bold text-left mb-2 text-black sm:text-xl">
            {!isLogin ? "Вход в аккаунт" : "Создайте аккаунт"}
          </h2>
          <p className="text-left opacity-60 text-sm mb-4 text-black">
            Заполните данные формы
          </p>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="email"
                render={() => (
                  <FormItem className="flex flex-col dark:text-black relative">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        className={`mt-1 block`}
                        {...form.register("email")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={() => (
                  <FormItem className="flex flex-col text-black relative">
                    <FormLabel>Пароль</FormLabel>
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-0 top-1 h-full px-3 py-2 z-[60]"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword((prev) => !prev);
                      }}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                    <FormControl>
                      <Input
                        placeholder="Введите пароль"
                        type={showPassword ? "text" : "password"}
                        className={`mt-1 block w-full `}
                        {...form.register("password")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded max-w-[150px] w-full"
                >
                  {!isLogin ? "Войти" : "Зарегистрироваться"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
