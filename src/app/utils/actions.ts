"use server";
import { revalidatePath } from "next/cache";
import { CatalogItemType } from "./definitions";
import { supabase } from "./supabase/supabaseClient";
import { v1 } from "uuid";
import {redirect} from 'next/navigation'
import {createClient} from '../../app/utils/supabase/serverSupabaseClient'


export const postData = async (formData: FormData) => {
  const title = formData.get("name");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const image = formData.get("image");
  const discount = Number(formData.get("discount"));
  const fulldescription = formData.get("fulldescription");
  const category = formData.get("category");
  const subcategory = formData.get("subcategory");
  const avaiblity = formData.get("avaiblity");
  const newest = formData.get("newest");
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
          price: price.toFixed(2),
          discount,
          fulldescription,
          category,
          subcategory,
          avaiblity,
          newest,
        },
      ])
      .select();
      if(data) {

        revalidatePath('/adminpage/catalog')
        return 'success'
      }
    if (error) {
      throw error;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateCatalogItem = async (id: string, data: CatalogItemType) => {
  try {
    let imageUrl: string | File  = data.images; 

    if (data.images instanceof File) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("Products images")
        .upload(`${id}.png`, data.images, {
          cacheControl: "3600",
          upsert: true
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
    return 'success'
  } catch (e) {
    console.error("Неожиданная ошибка:", e);
  }
};

export const removeItem = async (id: string) => {
  const {error} = await supabase.from('Products').delete().eq('id', id)
  const {error: storageError} = await supabase.storage.from('Products images').remove([`${id}.png`])
  if(error) {
    console.log('Ошибка при удалении товара')
  }
  if(storageError) {
    console.log('Ошибка при удалении изображения')
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

export const postInfo = async (formData: FormData) => {
  const title = formData.get("title");
  const link = formData.get("link");
  const image = formData.get("image");
  let id = v1();

  try {
    if (image) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("Info Images")
        .upload(`${id}.webp`, image, {
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
        image: `https://invnbdbustikwbnttmdr.supabase.co/storage/v1/object/public/Info%20Images/${id}.webp`,
      },
    ])
    .select();


    if(data) {
      revalidatePath('/')
    }

    if (error) {
      throw error;
    }
  }catch(e) {
    console.log(e)
  }

}

export const deleteInfo = async (id: string, imagePath: string) => {
  const { data, error } = await supabase
    .from("Info")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting record:", error);
    return;
  }
  const { error: storageError } = await supabase.storage
    .from("Info Images") 
    .remove([`${id}.webp`]);

  if (storageError) {
    console.error("Error deleting image:", storageError);
    return;
  }

  revalidatePath("/");
  revalidatePath("/adminpage/catalog");
};

export const updateInfo = async (
  id: string,
  updatedData: { title: string; link: string; image: string },
  file: File | null
) => {
  try {
    const bucketName = "Info Images"; 

    if (file) {
      const { error: deleteError } = await supabase.storage
        .from(bucketName)
        .remove([updatedData.image]); 
      if (deleteError) {
        console.error("Error deleting old image:", deleteError);
        return false;
      }

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(updatedData.image, file);
      if (uploadError) {
        console.error("Error uploading new file:", uploadError);
        return false;
      }
    }


    const { error: updateError } = await supabase
      .from("Info")
      .update(updatedData)
      .eq("id", id);
    if (updateError) {
      console.error("Error updating record:", updateError);
      return false;
    }

    revalidatePath("/");
    revalidatePath("/adminpage/catalog");

    return true;
  } catch (error) {
    console.error("Error updating info:", error);
    return false;
  }
};




