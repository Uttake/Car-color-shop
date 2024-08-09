"use server";

import { supabase } from "./supabaseClient";

export const postData = async (formData: FormData) => {
  const title = formData.get("name");
  const description = formData.get("description");
  const price = Number(formData.get("price"));

  let { data: Products, error } = await supabase.from("Products").select("*");
  console.log(Products);
};
