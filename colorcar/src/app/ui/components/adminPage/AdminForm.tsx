import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AdminInput from "./AdminInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  postData,
  updateCatalogItem,
  getCatalogItems,
} from "@/app/utils/actions";
import { useFormStatus } from "react-dom";
import Spinner from "../Spinner";

const AdminForm = ({
  item,
  update,
  query,
}: {
  item: any;
  update: boolean;
  query: string;
}) => {
  console.log(update);
  const {
    register,
    handleSubmit,
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
    const formattedData = {
      ...data,
      images: preview || item.images,
      price: parseFloat(data.price || 0),
      discount: parseFloat(data.discount || 0),
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
      formData.append("fulldescription", data.fulldescription);
      formData.append("category", data.category);
      formData.append("subcategory", data.subcategory);
      reset();
      await postData(formData);
    }
    await getCatalogItems(query, 7);
  };

  // File {
  //   size: 34807,
  //   type: 'image/png',
  //   name: 'Yatu-Easicoat-Auto-Paint.1800x1200w.png',
  //   lastModified: 1733053232811
  // }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 flex-1"
    >
      <div className="flex gap-6">
        <div>
          <div className="flex flex-col gap-2 mb-5">
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
              // defaultValue={item.images}
            />
          </div>
          <label className="flex flex-col gap-2">
            Категория
            <Input
              {...register("category")}
              type="string"
              defaultValue={update ? item.category : ""}
              placeholder="Категория"
            />
          </label>
          <label className="flex flex-col gap-2">
            Подкатегория
            <Input
              {...register("subcategory")}
              type="text"
              defaultValue={update ? item.subcategory : ""}
              placeholder="Подкатегория"
            />
          </label>
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
            Цена
            <Input
              {...register("price")}
              type="number"
              defaultValue={update ? item.price : ""}
              placeholder="Цена"
            />
          </label>

          <label className="flex flex-col gap-2">
            Скидка
            <Input
              {...register("discount")}
              type="number"
              defaultValue={update ? item.discount : ""}
              placeholder="Скидка"
            />
          </label>

          <AdminInput
            value="fulldescription"
            register={register}
            title="Полное описание"
            defaultValue={update ? item.fulldescription : ""}
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
