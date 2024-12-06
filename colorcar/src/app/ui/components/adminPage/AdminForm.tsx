"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AdminInput from "./AdminInput";
import catalogData from "@/app/_data/catalog-data.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  postData,
  updateCatalogItem,
  getItemsByCategory,
} from "@/app/utils/actions";
import { useFormStatus } from "react-dom";
import Spinner from "../Spinner";
import EditorBlock from "../EditorBlock/EditorBlock";
import { fixStyleString } from "@/app/utils";
import DOMPurify from "isomorphic-dompurify";
import Dropdown from "../DropDown";

let avaiblity = [
  {
    title: "В наличии",
    category: "true",
  },
  {
    title: "Под заказ",
    category: "false",
  },
];

const AdminForm = ({
  item,
  update,
  query,
}: {
  item: any;
  update: boolean;
  query: string;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [preview, setPreview] = useState<string>(update ? item.images : "");
  const { pending } = useFormStatus();

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
    console.log(data);
    const formattedData = {
      ...data,
      images: preview || item.images,
      price: parseFloat(data.price || 0),
      discount: parseFloat(data.discount || 0),
      fulldescription: data.fulldescription || item.fulldescription,
    };

    if (update) {
      await updateCatalogItem(item.id, formattedData);
      reset();
    } else {
      const formData = new FormData();
      formData.append("name", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("discount", data.discount.toString());
      formData.append("image", data.images[0]);
      formData.append("fulldescription", JSON.stringify(data.fulldescription));
      formData.append("category", data.category);
      formData.append("avaiblity", data.avaiblity);
      formData.append("newest", data.newest);
      reset();
      await postData(formData);
    }
    await getItemsByCategory({ query, page: 7 });
  };

  const clearDescription = fixStyleString(item.fulldescription || "");

  const sanitizedDescription = DOMPurify.sanitize(
    fixStyleString(clearDescription || ""),
    {
      ALLOWED_ATTR: ["class", "style", "id", "title"],
    }
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 flex-1"
    >
      <div className="flex gap-6">
        <div>
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
          <Dropdown
            options={catalogData}
            label="Категория"
            control={control}
            name="category"
          />

          <Dropdown
            label="Наличие"
            control={control}
            name="avaiblity"
            options={avaiblity}
          />

          <Controller
            name="newest"
            control={control}
            defaultValue={update ? item.newest : false}
            render={({ field }) => (
              <label className="flex items-center gap-2 text-sm font-medium mt-5">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                Новинка
              </label>
            )}
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <AdminInput
            value="title"
            register={register}
            title="Название"
            defaultValue={update ? item.title : ""}
          />

          <AdminInput
            value="description"
            register={register}
            title="Описание"
            defaultValue={update ? item.description : ""}
          />

          <label className="flex flex-col gap-2 text-sm font-medium">
            Цена USD
            <Input
              {...register("price")}
              type="number"
              step="any"
              defaultValue={update ? item.price : ""}
              placeholder="Цена USD"
            />
          </label>

          <label className="flex flex-col gap-2">
            Скидка
            <Input
              {...register("discount")}
              type="number"
              step="any"
              defaultValue={update ? item.discount : ""}
              placeholder="Скидка"
            />
          </label>
          <Controller
            name="fulldescription"
            control={control}
            defaultValue={update ? sanitizedDescription : ""}
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

      <Button>
        {pending ? (
          <Spinner fill="fill-white" size="sm" />
        ) : update ? (
          "Редактировать"
        ) : (
          "Добавить"
        )}
      </Button>
    </form>
  );
};

export default AdminForm;
