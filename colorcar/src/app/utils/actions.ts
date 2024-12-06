"use server";

import { revalidatePath } from "next/cache";
import { CatalogItemType } from "./definitions";
import { supabase } from "./supabase/supabaseClient";
import { v1 } from "uuid";
import {redirect} from 'next/navigation'
import {createClient} from '../../app/utils/supabase/serverSupabaseClient'
import { getUsd } from "./index";


export const postData = async (formData: FormData) => {
  
  const title = formData.get("name");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const image = formData.get("image");
  const discount = Number(formData.get("discount"));
  const fulldescription = formData.get("fulldescription");
  const category = formData.get("category");
  const avaiblity = formData.get("avaiblity");
  const newest = formData.get("newest");
  let id = v1();

  let course = await getUsd()

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
          price: (price * course).toFixed(2),
          discount,
          fulldescription,
          category,
          avaiblity,
          new: newest,
        },
      ])
      .select();
      if(data) {
        revalidatePath('/adminpage/catalog')
      }
    if (error) {
      throw error;
    }
  } catch (err) {
    console.log(err);
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
      revalidatePath('/adminpage/catalog')
    if (error) {
      console.error("Ошибка обновления данных:", error);
      return;
    }

    revalidatePath("/adminpage/catalog");

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

export const removeItem = async (id: string) => {
  const {error} = await supabase.from('Products').delete().eq('id', id)
  if(error) {
    console.log('Ошибка при удалении товара')
  }
  revalidatePath('/adminpage/catalog')
}


export const login = async (data: {email: string, password: string}) => {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/adminpage')
  }

  revalidatePath('/adminpage/catalog')
  redirect('/adminpage/catalog')
}


export const signup = async (data: {email: string, password: string}) =>  {
  const supabase = await createClient()
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/adminpage/catalog')
  redirect('/adminpage/catalog')
}

export const logout =  async () => {
  const supabase = await createClient()
  const {error} = await supabase.auth.signOut()
  revalidatePath('/adminpage')
  redirect('/adminpage')
}


export const getItemsByCategory = async ({
  query,
  slug,
  page,
  sortParam,
}: {
  query: string;
  slug?: string;
  page: number;
  sortParam?: [string, string] | undefined;
}) => {
  try {
    const rangeStart = (page - 1) * 8;
    const rangeEnd = rangeStart + 7;
    const productsQuery = supabase
      .from("Products")
      .select("*")
      .range(rangeStart, rangeEnd);
      
    if (query) {
      console.log(query);
      productsQuery.ilike("title", `%${query}%`);
    }
    if (slug) {
      productsQuery.eq("category", slug);
    }

    if (sortParam && sortParam[0] === "sortByprice") {
      const isAscending = sortParam[1] !== "true"; 
      productsQuery.order("price", { ascending: isAscending });
    }
    
    if(sortParam && sortParam[0] === "sortBystock") {
      const isAscending = sortParam[1] !== "true"; 
      productsQuery.order("avaiblity", { ascending: isAscending });
    }

    const { data, error } = await productsQuery;
    if (error) {
      throw new Error(error.message || "Failed to fetch products");
    }

    if (data && data.length > 0) {
      return { data };
    } else {
      throw new Error("No products found");
    }
  } catch (err) {
    const errorMessage = (err as Error).message || "Server error";
    return { error: errorMessage };
  }
};


export const postInfo = async (formData: FormData) => {
  const title = formData.get("title");
  const link = formData.get("link");
  const image = formData.get("image");
  let id = v1();

  try {
    if (image) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("Info Images")
        .upload(`${id}.png`, image, {
          cacheControl: "3600",
          upsert: false,
        });
    }

  
    const { data, error } = await supabase
    .from("Info")
    .insert([
      {
        id,
        title,
        link,
        image: `https://invnbdbustikwbnttmdr.supabase.co/storage/v1/object/public/Info%20Images/${id}.png`,
      },
    ])
    .select();


    if(data) {
      console.log(data)
      revalidatePath('/')
    }

    if (error) {
      throw error;
    }
  }catch(e) {
    console.log(e)
  }

}

export const getInfo = async() => {
  const { data, error } = await supabase
    .from("Info")
    .select("*")
    if(error) {
      console.log(error)
    }
    return data
}