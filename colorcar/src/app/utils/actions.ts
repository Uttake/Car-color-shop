"use server";

import { revalidatePath } from "next/cache";
import { CatalogItemType } from "./definitions";
import { supabase } from "./supabaseClient";
import { v1 } from "uuid";


export const postData = async (formData: FormData) => {
  
  const title = formData.get("name");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const image = formData.get("image");
  const discount = Number(formData.get("discount"));
  const fulldescription = formData.get("fulldescription");
  const category = formData.get("category");
  const subcategory = formData.get("subcategory");

  let id = v1();
  try {
    if (image) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("Products images")
        .upload(`${id}.png`, image, {
          cacheControl: "3600",
          upsert: false,
        });
    }
    const { data, error } = await supabase
      .from("Products")
      .insert([
        {
          id,
          title,
          description,
          images: `https://invnbdbustikwbnttmdr.supabase.co/storage/v1/object/public/Products%20images/${id}.png`,
          price,
          discount,
          fulldescription,
          category,
          subcategory
        },
      ])
      .select();

    if (error) {
      throw error;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCatalogItems = async (
  query: string,
  page: number
): Promise<{ data?: CatalogItemType[]; error?: string }> => {
  try {
    let Products;
    let queryError;

    if (query) {
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .ilike("title", `%${query}%`)
        .range(0, 8);
      Products = data;
      queryError = error;
    } else {
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .range(0, 8);
      Products = data;
      queryError = error;
    }

    if (queryError) {
      throw new Error(queryError.message || "Failed to fetch products");
    }

    if (Products) {
      revalidatePath("/catalog");
      return { data: Products };
    } else {
      throw new Error("No products found");
    }
  } catch (err) {
    const errorMessage = (err as Error).message || "Server error";
    return { error: errorMessage };
  }
};

export const getRowCount = async (): Promise<{
  count?: number;
  error?: string;
}> => {
  try {
    const { count, error } = await supabase
      .from("Products")
      .select("*", { count: "exact", head: true });

    if (error) throw new Error(error.message || "Failed to fetch products");

    if (count) {
      return { count: count };
    } else {
      throw new Error("No products found");
    }
  } catch (err) {
    const errorMessage = (err as Error).message || "Server error";
    return { error: errorMessage };
  }
};


export const getCatalogItem = async(id: string): Promise<CatalogItemType> => {
  const { data, error } = await supabase
    .from('Products') 
    .select('*') 
    .eq('id', id)
    .single(); 

    if (error) {
      console.error('Error fetching data:', error);
    }

  return data;   
}

export const updateCatalogItem = async (id: string, data: CatalogItemType) => {
  try {
    let imageUrl = data.images; 

    if (data.images instanceof File) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("Products images")
        .upload(`${id}.png`, data.images, {
          cacheControl: "3600",
          upsert: false,
        });

      if (storageError) {
        console.error("Ошибка загрузки изображения:", storageError);
        return;
      }

      const publicUrlResponse = supabase.storage
        .from("Products images")
        .getPublicUrl(`${id}.png`);

      if (!publicUrlResponse.data?.publicUrl) {
        console.error("Не удалось получить публичный URL изображения.");
        return;
      }

      imageUrl = publicUrlResponse.data.publicUrl; 
    }


    const { error } = await supabase
      .from("Products")
      .update({ ...data, images: imageUrl }) 
      .eq("id", id);

    if (error) {
      console.error("Ошибка обновления данных:", error);
      return;
    }

    console.log("Данные успешно обновлены");
  } catch (e) {
    console.error("Неожиданная ошибка:", e);
  }
};

export const getSearchItems = async (query: string) => {
  try {
    const { data, error } = await supabase
    .from("Products")
    .select("title")
    .ilike("title", `%${query}%`)
    .range(0, 8);
    if(error) {
      console.log(error);
    }
    return data
  }catch(e) {
    console.log(e)
  }
}

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

