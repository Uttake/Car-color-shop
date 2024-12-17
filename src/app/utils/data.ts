'use server'
import { CatalogItemType } from "./definitions";
import { supabase } from "./supabase/supabaseClient";


export const getNewest = async () => {
    try {
      const {data, error} = await supabase.from('Products').select('*').eq('newest', true)
  
      if(error) {
        throw new Error(error.message)
      }
  
      return data
    } catch (error) {
      console.log(error)
    }
  }

  export const getRowCount = async ({
    slug,
    query,
    minPrice, 
    maxPrice,
    status
  }: {
    slug?: string;
    query?: string;
    minPrice?: number;
    maxPrice?: number;
    status?:string[];
  }): Promise<{
    count?: number;
    error?: string;
  
  }> => {
    try {
      const productsQuery = supabase
        .from("Products")
        .select("*", { count: "exact", head: true });
  
      if (slug) {
        if (slug.includes('-')) {
          productsQuery.eq("subcategory", slug);
        } else {
          productsQuery.eq("category", slug);
        }
      }
  
      if(query) {
        productsQuery.ilike('title', `%${query}%`)
      }
  
      if (minPrice) {
        productsQuery.gte("price", minPrice);
        productsQuery.lte("price", maxPrice);
      }
  
      if (status && status.length > 0) {
        const filters = [];
        if (status.includes("available")) {
          filters.push("avaiblity.eq.true");
        }
        if (status.includes("order")) {
          filters.push("avaiblity.eq.false");
        }
        if (filters.length > 0) {
          productsQuery.or(filters.join(","));
        }
      }
      const { count, error } = await productsQuery;
  
      if (error) throw new Error(error.message || "Failed to fetch products");
  
      if (count !== null && count !== undefined) {
        return { count };
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


  export const getSearchItems = async (query: string, slug?: string) => {
    try {
      const productQuery = supabase
        .from("Products")
        .select('title')
        .ilike("title", `%${query}%`)
        .range(0, 8);
  
      if (slug) {
        if (slug.includes('-')) {
          productQuery.eq("subcategory", slug);
        } else {
          productQuery.eq("category", slug);
        }
      }
      const { data, error } = await productQuery
  
      if(error) {
        console.log(error);
      }
      return data
    }catch(e) {
      console.log(e)
    }
  }


  export const getItemsByCategory = async ({
    query,
    slug,
    page,
    sortParam,
    minPrice,
    maxPrice,
    status,
    row
  }: {
    query: string;
    slug?: string;
    page: number;
    sortParam?: [string, string] | undefined;
    minPrice?: number;
    maxPrice?: number;
    status?: string[];
    row?: number;
  }) => {
    try {
      const { count } = await getRowCount({slug, query, minPrice, maxPrice, status});
      const totalItems = count ?? 0;
  
      const totalPages = Math.ceil(totalItems / (row ?? 9));
      page = Math.min(page, totalPages);
  
      const rangeStart = (page - 1) * (row ?? 9);
      const rangeEnd = Math.min(rangeStart + (row ?? 9) - 1, totalItems - 1);
  
  
      const productsQuery = supabase
        .from("Products")
        .select("*")
        .range(rangeStart, rangeEnd);
  
  
      if (query) {
        productsQuery.ilike("title", `%${query}%`);
      }
  
      if(slug) {
        if(slug.includes('-')) {
          productsQuery.eq("subcategory", slug)
        } else {
          productsQuery.eq("category", slug)
        }
  
      }
      
      if (sortParam && sortParam[0] === "sortByprice") {
        const isAscending = sortParam[1] !== "true";
        productsQuery.order("price", { ascending: isAscending });
      }
  
  
      if (sortParam && sortParam[0] === "sortBystock") {
        const isAscending = sortParam[1] !== "true";
        productsQuery.order("avaiblity", { ascending: isAscending });
      }
  
      if (sortParam && sortParam[0] === "sortBynew") {
        const isAscending = sortParam[1] !== "true";
        productsQuery.order("created_at", { ascending: isAscending });
      }
  
  
      if (minPrice) {
        productsQuery.gte("price", minPrice);
        productsQuery.lte("price", maxPrice);
      }
  
  
      if (status && status.length > 0) {
        const filters = [];
        if (status.includes("available")) {
          filters.push("avaiblity.eq.true");
        }
        if (status.includes("order")) {
          filters.push("avaiblity.eq.false");
        }
        if (filters.length > 0) {
          productsQuery.or(filters.join(","));
        }
      }
  
      const { data, error } = await productsQuery;
      if (error) {
        throw new Error(error.message || "Failed to fetch products");
      }
  
      if (data && data.length > 0) {
        return { data, count };
      } else {
        throw new Error("No products found");
      }
    } catch (err) {
      const errorMessage = (err as Error).message || "Server error";
      return { error: errorMessage };
    }
  };


  export const getInfo = async() => {
    const { data, error } = await supabase
      .from("Info")
      .select("*")
      if(error) {
        console.log(error)
      }
      return data
  }

  export const getPriceRange = async () => {
    try {
      const { data, error } = await supabase
        .from("Products")
        .select("price");
  
      if (error) {
        throw new Error(`Ошибка получения диапазона цен: ${error.message}`);
      }
  
      if (!data || data.length === 0) {
        return { minPrice: 0, maxPrice: 0 };
      }
  
      const prices = data.map(item => item.price);
      return {
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
      };
    } catch (e) {
      console.log(e);
      return { minPrice: 0, maxPrice: 0 };
    }
  };