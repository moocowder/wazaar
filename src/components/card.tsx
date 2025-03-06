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
      className="w-full max-w-[550px] flex flex-col sm:flex-row sm:p-2 items-center gap-4 sm:gap-6 sm:rounded-lg sm:hover:bg-black sm:hover:scale-105 duration-300 transition-all ease-in-out"
      href={`/items/${id}`}
    >
      {/* 🖼️ Item Image */}
      <Image
        className="sm:rounded-md w-full sm:w-[200px] h-[200px] object-cover"
        src={supabase.storage.from("pics").getPublicUrl(image).data.publicUrl}
        alt="item image"
        width={200}
        height={200}
      />

      {/* 📌 right side */}
      <div className="flex flex-1 flex-col gap-2 w-full sm:h-[200px] max-sm:px-2">
        {/* 📌 Item Name */}
        <div className="text-xl font-semibold text-center sm:text-left">
          {name}
        </div>
        {/* 💲 Price & ⭐ Rating & type & button*/}
        <div className="flex flex-col justify-between gap-3 sm:gap-2">
          <div className="flex items-center justify-center sm:justify-between gap-4 text-gray-300">
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
          <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-[#9036ff30] rounded-full w-fit mx-auto sm:mx-0">
            🐉🦉 {type}
          </span>
          <Bouton
            onClick={(e) => {
              e.preventDefault()
            }}
            className="font-normal w-full sm:w-auto"
          >
            Add to cart
          </Bouton>
        </div>
      </div>
    </Link>
  )
}
