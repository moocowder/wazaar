import { queryClient } from "@/lib/reactQuery"
import { supabase } from "@/lib/supabaseClient"
import { ItemDTO } from "@/types/itemDto"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"

export const useGetCartItems = () =>
  useQuery({
    queryKey: ["user-cart"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cart")
        .select("items(*)")
        .returns<{ items: ItemDTO }[]>()

      if (error) throw new Error("couldn't get items from cart")
      else return data.map((entry) => entry.items)
    },
  })

export const useAddItemToCart = () =>
  useMutation({
    mutationFn: async (itemId: string) => {
      const { data, error } = await supabase
        .from("cart")
        .insert({ item_id: itemId })

      if (error) throw Error("couldn't add item! : ", error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart"] })
    },
  })

export const useRemoveItemFromCart = () =>
  useMutation({
    mutationFn: async (itemId: string) => {
      const { data, error } = await supabase
        .from("cart")
        .delete()
        .eq("item_id", itemId)

      if (error) throw Error("couldn't remove item!", error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart"] })
    },
  })
