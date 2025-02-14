"use client"
import Card from "@/components/card"
import Cart from "@/components/cart"
import { supabase } from "@/lib/supabaseClient"
import useCartStore from "@/stores/cart"
import { ItemType } from "@/types/item"
import { Star } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function Item() {
  const { addItem, hasItem, removeItem } = useCartStore()
  const params = useParams()
  const id = params?.id
  const [item, setItem] = useState<ItemType>()

  useEffect(() => {
    console.log(id)
    const fetchArtifacts = async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .single()
      if (error) console.error("Error fetching items:", error)
      else setItem(data)
    }

    fetchArtifacts()
  }, [])

  useEffect(() => {
    if (item) console.log(item)
  }, [item])

  const onAddToCartClick = async (item: ItemType) => {
    const { data, error } = await supabase
      .from("cart")
      .insert({ item_id: item.id })

    if (error) console.error("couldn't add item! : ", error)
    else addItem(item)
  }

  const onRemoveFromCartClick = async (id: string) => {
    const { data, error } = await supabase
      .from("cart")
      .delete()
      .eq("item_id", id)
    if (error) console.error("couldn't delete item :", error)
    else removeItem(id)
  }

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
            {hasItem(item.id) ? (
              <button
                onClick={() => onRemoveFromCartClick(item.id)}
                className="px-6 py-3 text-lg font-semibold border border-purple-600 text-white rounded-xl "
              >
                Remove from cart
              </button>
            ) : (
              <button
                onClick={() => onAddToCartClick(item)}
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

const itemInCart = (id: string, items: ItemType[]) => {
  return items.some((i) => i.id === id)
}
