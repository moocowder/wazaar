import { supabase } from "@/lib/supabaseClient"
import { ItemType } from "@/types/item"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = Omit<ItemType, "description">

export default function CartItem({
  id,
  name,
  price,
  rating,
  type,
  image,
}: Props) {
  return (
    <Link href={`/items/${id}`} className="flex gap-2 items-start">
      <Image
        className="rounded-md"
        src={supabase.storage.from("pics").getPublicUrl(image).data.publicUrl}
        alt="item image"
        width={100}
        height={100}
      />
      <div className="flex flex-col gap-1 text-xs">
        <span className="text-lg">{name}</span>
        <span>🪙 {price}</span>
        <span className="flex items-center gap-1">
          <Star size={14} color="yellow" />
          {rating}
        </span>
        <span className="px-1 w-max bg-[#FF000030] text-red-700 rounded-full">
          {type}
        </span>
      </div>
    </Link>
  )
}
