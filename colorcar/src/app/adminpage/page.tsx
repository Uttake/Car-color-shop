"use client";
import React, { useState } from "react";
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
    console.log(data);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col dark:text-black relative">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        className={`mt-1 block ${
                          fieldState.error ? "border-red-500" : ""
                        }`}
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-1 absolute -bottom-5">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
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
                        className={`mt-1 block w-full ${
                          fieldState.error ? "border-red-500" : ""
                        }`}
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-1 absolute -bottom-5">
                        {fieldState.error.message}
                      </p>
                    )}
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
          <div className="flex items-center mt-4 opacity-60 mb-4">
            <div className="flex-grow border-t border-gray-400"></div>
            <div className="mx-4 text-black text-center">или</div>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="text-sm text-black mt-4 text-center">
            {!isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <button
              className="text-blue-600 ml-2 hover:underline transition-all"
              onClick={() => setIsLogin(!isLogin)}
            >
              {!isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
