"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import EditorBlock from "../EditorBlock/EditorBlock";
import Dropdown from "../DropDown";
import catalogData from "@/app/_data/catalog-data.json";
import clsx from "clsx";
interface InfoItemProps {
  data: {
    title: string;
    image: string;
    link: string;
    id: string;
  };
}

const InfoItem = ({ data }: InfoItemProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [edit, SetEdit] = useState(false);
  const [preview, setPreview] = useState<string>(data.image);

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
  return (
    <div
      className={clsx(
        {
          "flex items-center justify-between border-[1px] border-orange-brdr px-3 py-3":
            !edit,
        },
        { "flex items-start justify-between gap-2": edit }
      )}
    >
      {edit ? (
        <div className="flex flex-col gap-4 mb-5">
          <span>Изображение</span>
          {preview ? (
            <img
              src={preview}
              alt="Предпросмотр"
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
        </div>
      ) : (
        <div
          className="w-[100px] h-[100px]"
          style={{
            background: `url(${data.image}) bottom center / cover scroll no-repeat`,
          }}
        ></div>
      )}
      {edit ? (
        <Controller
          name="title"
          control={control}
          defaultValue={data.title}
          rules={{ required: "Полное описание обязательно" }}
          render={({ field }) => (
            <EditorBlock
              value={field.value}
              onChange={(newValue) => setValue("title", newValue)}
              title="Описание"
            />
          )}
        />
      ) : (
        <div>
          <h3 className="mb-3 text-center font-bold border-b-[1px] border-gray-400">
            Текст
          </h3>
          <div
            className="max-w-[240px] w-full"
            dangerouslySetInnerHTML={{ __html: data.title }}
          ></div>
        </div>
      )}

      {edit ? (
        <Dropdown
          options={catalogData}
          label="Ссылка"
          control={control}
          name="link"
        />
      ) : (
        <div>
          <h3 className="mb-3 text-center font-bold border-b-[1px] border-gray-400">
            Ссылка
          </h3>
          <div>{data.link}</div>
        </div>
      )}

      <div>
        <button onClick={() => SetEdit(!edit)}>Изменить</button>
        <button>Удалить</button>
      </div>
    </div>
  );
};

export default InfoItem;
