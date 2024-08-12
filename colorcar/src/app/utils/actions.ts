"use server";

import { revalidatePath } from "next/cache";
import { CatalogItemType } from "./definitions";
import { supabase } from "./supabaseClient";
import { v1 } from "uuid";

export const postData = async (formData: FormData) => {
  const title = formData.get("name");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const image = formData.get('image');
  
  let id = v1();
  try {
    if(image) {
      const { data: storageData, error: storageError } = await supabase
      .storage
      .from('Products images')
      .upload(`${id}.png`, image, {
      cacheControl: '3600',
      upsert: false
    })
    }
    const { data, error } = await supabase
    .from('Products')
    .insert([
      {id, title, description, images: `https://invnbdbustikwbnttmdr.supabase.co/storage/v1/object/public/Products%20images/${id}.png`, price},
    ])
    .select()
    
    if(error) {
      throw error
    }
  } catch (err) {
      console.log(err)
  }
}


export const getCatalogItems = async() : Promise<CatalogItemType[]>  => {
  try { 
  let { data: Products, error } = await supabase
    .from('Products')
    .select('*')
    if(Products) {
      revalidatePath('/catalog');
      return Products
    } else {
      throw error
    }
  } catch(err){
    throw err
  }
}

