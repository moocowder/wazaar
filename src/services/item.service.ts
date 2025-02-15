import { supabase } from "@/lib/supabaseClient"
import { ItemDTO } from "@/types/itemDto"
import { useQuery } from "@tanstack/react-query"

export const useGetItems = () =>
  useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { error, data } = await supabase
        .from("items")
        .select("*")
        .returns<ItemDTO[]>()
      if (error) throw new Error("couldn't get items :", error)
      return data
    },
  })

export const useGetItem = (itemId: string) =>
  useQuery({
    queryKey: ["item"],
    queryFn: async () => {
      const { error, data } = await supabase
        .from("items")
        .select("*")
        .eq("id", itemId)
        .single<ItemDTO>()
      if (error) throw new Error(error.message) // React Query will handle this error
      return data
    },
  })
