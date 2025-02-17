import { supabase } from "@/lib/supabaseClient"
import { ItemType } from "@/types/item"
import { Coins, Currency, DollarSign, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import Bouton from "./bouton"

type Props = Omit<ItemType, "description">

export default function Card({ id, name, price, rating, type, image }: Props) {
  return (
    <Link
      className="w-[550px] p-4 flex items-center justify-center flex-wrap gap-6 rounded-lg hover:bg-black hover:scale-105 duration-300 transition-all ease-in-out"
      href={`/items/${id}`}
    >
      {/* 🖼️ Item Image */}
      <Image
        className="rounded-md"
        src={supabase.storage.from("pics").getPublicUrl(image).data.publicUrl}
        alt="item image"
        width={200}
        height={200}
      />

      {/* 📌 right side */}
      <div className="flex flex-1 flex-col gap-2 h-[200px]">
        {/* 📌 Item Name */}
        <div className="text-xl font-semibold">{name}</div>
        {/* 💲 Price & ⭐ Rating & type & button*/}
        <div className="flex flex-col justify-between flex-1">
          <div className="flex items-center justify-between gap-4 text-gray-300">
            <span className="flex items-center gap-1">
              <DollarSign className="text-yellow-500 w-5 h-5" />
              <span className="font-medium">{price}</span>
            </span>
            <span className="flex items-center gap-1">
              <Star className="text-yellow-500 w-5 h-5" />
              <span className="font-medium">{rating}</span>
            </span>
          </div>

          {/* 🏷️ Item Type */}
          <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-[#9036ff30] rounded-full w-fit">
            🐉🦉 {type}
          </span>
          <Bouton
            onClick={(e) => {
              e.preventDefault()
            }}
            className="font-normal"
          >
            Add to cart
          </Bouton>
        </div>
      </div>
    </Link>
  )
}
