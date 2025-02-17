"use client"
import Bouton from "@/components/bouton"
import { supabase } from "@/lib/supabaseClient"
import {
  useAddItemToCart,
  useGetCartItems,
  useRemoveItemFromCart,
} from "@/services/cart.service"
import { useGetItem } from "@/services/item.service"
import { ItemType } from "@/types/item"
import { DollarSign, Star } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function Item() {
  const params = useParams()
  const id = params?.id as string
  const { isPending, error, isError, data: item } = useGetItem(id)

  const { data: CartItems } = useGetCartItems()
  const addItemMutation = useAddItemToCart()
  const removeItemMutation = useRemoveItemFromCart()

  if (isPending) return <div>pending....</div>
  if (isError) return <div>error... {error.message}</div>

  if (!item) return <div>no item</div>

  return (
    <div className="m-8 mx-16 flex flex-col gap-8">
      <div className="p-4 flex items-start flex-wrap gap-6">
        {/* 🖼️ Item Image */}
        <Image
          className="rounded-md"
          src={
            supabase.storage.from("pics").getPublicUrl(item.image).data
              .publicUrl
          }
          alt="item image"
          width={400}
          height={400}
        />

        {/* 📌 right side */}
        <div className="flex flex-1 flex-col gap-4 h-[400px]">
          {/* 📌 Item Name */}
          <div className="text-4xl font-semibold">{item.name}</div>
          {/* 💲 Price & ⭐ Rating & type & button*/}
          <div className="flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between gap-4 text-gray-300">
              <span className="flex items-center gap-1">
                <DollarSign className="text-yellow-500 w-5 h-5" />
                <span className="font-medium">{item.price}</span>
              </span>
              <span className="flex items-center gap-1">
                <Star className="text-yellow-500 w-5 h-5" />
                <span className="font-medium">{item.rating}</span>
              </span>
              {/* 🏷️ Item Type */}
              <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-[#9036ff30] rounded-full w-fit">
                🐉🦉 {item.type}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {CartItems && CartItems.some((i) => i.id === id) ? (
                <Bouton onClick={() => removeItemMutation.mutate(item.id)}>
                  Remove from Cart
                </Bouton>
              ) : (
                <Bouton onClick={() => addItemMutation.mutate(item.id)}>
                  Add to cart
                </Bouton>
              )}

              <Bouton onClick={() => {}} type="primary">
                Buy now
              </Bouton>
            </div>
          </div>
        </div>
      </div>
      <div>{item.description}</div>
    </div>
  )
}
