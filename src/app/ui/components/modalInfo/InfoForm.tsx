"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import EditorBlock from "../EditorBlock/EditorBlock";
import Dropdown from "../DropDown";
import catalogData from "@/app/_data/catalog-data.json";
import { postInfo } from "@/app/utils/actions";
import Image from "next/image";

const InfoForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [preview, setPreview] = useState<string>("");
  const [infoData, setInfoData] = useState(catalogData);

  let dopInfo = [
    {
      title: "Информация",
      category: "info",
      link: "/info",
    },
    {
      title: "Подбор краски",
      category: "podbor",
      link: "/services/podbor-kraski",
    },
    {
      title: "Заправка аэрозолей",
      category: "zapravka-aerosoli",
      link: "/services/zapravka-aerosolov",
    },
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("image", data.images[0]);
    formData.append("fulldescription", JSON.stringify(data.fulldescription));
    formData.append("title", data.title);
    formData.append("link", data.link);
    reset();
    await postInfo(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 justify-center items-center w-full"
    >
      <div className="flex gap-6">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col gap-4 mb-5">
            <span>Изображение</span>
            {preview ? (
              <Image
                src={preview}
                alt="Предпросмотр"
                width={160}
                height={160}
                className="w-40 h-40 object-cover rounded border mb-2"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 text-gray-500 flex items-center justify-center rounded border mb-2">
                Нет изображения
              </div>
            )}
            <input
              {...register("images")}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Dropdown
              options={[...dopInfo, ...infoData]}
              label="Ссылка"
              control={control}
              name="link"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Controller
              name="title"
              control={control}
              defaultValue={""}
              rules={{ required: "Полное описание обязательно" }}
              render={({ field }) => (
                <EditorBlock
                  value={field.value}
                  onChange={(newValue) => setValue("title", newValue)}
                  title="Описание на слайде"
                />
              )}
            />

            <Controller
              name="fulldescription"
              control={control}
              defaultValue={""}
              rules={{ required: "Полное описание обязательно" }}
              render={({ field }) => (
                <EditorBlock
                  value={field.value}
                  onChange={(newValue) => setValue("fulldescription", newValue)}
                  title="Полное описание"
                />
              )}
            />
          </div>
        </div>
      </div>

      <Button>Добавить</Button>
    </form>
  );
};

export default InfoForm;
