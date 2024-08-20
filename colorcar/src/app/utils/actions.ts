"use server";

import { revalidatePath } from "next/cache";
import { CatalogItemType } from "./definitions";
import { supabase } from "./supabaseClient";
import { v1 } from "uuid";
import { z } from "zod";

export const postData = async (formData: FormData) => {
  const title = formData.get("name");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const image = formData.get("image");

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
  query: string
): Promise<{ data?: CatalogItemType[]; error?: string }> => {
  try {
    let Products;
    let queryError;

    if (query) {
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .ilike("title", `%${query}%`)
        .range(0, 5);
      Products = data;
      queryError = error;
    } else {
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .range(0, 5);
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
