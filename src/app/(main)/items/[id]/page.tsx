"use client"
import { supabase } from "@/lib/supabaseClient"
import {
  useAddItemToCart,
  useGetCartItems,
  useRemoveItemFromCart,
} from "@/services/cart.service"
import { useGetItem } from "@/services/item.service"
import { ItemType } from "@/types/item"
import { Star } from "lucide-react"
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
      <div className="flex gap-8 justify-center flex-wrap">
        <Image
          src={
            supabase.storage.from("pics").getPublicUrl(item.image).data
              .publicUrl
          }
          alt="item image"
          width={400}
          height={400}
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-6xl">{item.name}</span>
            <span className="text-2xl">
              🪙 {item.price} <span className="text-lg">Zins</span>
            </span>
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <Star color="yellow" />
                {item.rating}
              </span>
              <span className="px-2 inline-flex items-center w-max bg-[#FF000030] text-sm text-red-700 rounded-full">
                {item.type}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {CartItems && CartItems.some((i) => i.id === id) ? (
              <button
                onClick={() => removeItemMutation.mutate(item.id)}
                className="px-6 py-3 text-lg font-semibold border border-purple-600 text-white rounded-xl "
              >
                Remove from cart
              </button>
            ) : (
              <button
                onClick={() => addItemMutation.mutate(item.id)}
                className="px-6 py-3 text-lg font-semibold border border-purple-600 text-white rounded-xl "
              >
                Add to cart
              </button>
            )}

            <button className="px-6 py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition-all duration-300">
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div>{item.description}</div>
    </div>
  )
}
