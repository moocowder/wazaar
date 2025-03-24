import { supabase } from "@/lib/supabaseClient"
import { ItemType } from "@/types/item"
import { DollarSign, Star, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
// import { useRemoveCartItem } from "@/services/cart.service"

type Props = Omit<ItemType, "description">

export default function CartItem({
  id,
  name,
  price,
  rating,
  type,
  image,
}: Props) {
  // const removeItemMutation = useRemoveCartItem()

  // const handleRemove = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   removeItemMutation.mutate(id)
  // }

  return (
    <div className="group relative bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all duration-200 overflow-hidden">
      <Link href={`/items/${id}`} className="flex gap-3 p-2">
        {/* Image with overlay effect on hover */}
        <div className="relative w-[80px] h-[80px] flex-shrink-0">
          <Image
            className="rounded-md object-cover w-full h-full"
            src={
              supabase.storage.from("pics").getPublicUrl(image).data.publicUrl
            }
            alt={name}
            width={80}
            height={80}
          />
          <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 rounded-md transition-opacity duration-200"></div>
        </div>

        {/* Item details */}
        <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
          {/* Name with truncation for long names */}
          <span className="font-medium text-white truncate">{name}</span>

          {/* Price and rating */}
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-yellow-500" />
              <span>{price}</span>
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-500" />
              <span>{rating}</span>
            </span>
          </div>

          {/* Item type */}
          <span className="px-2 py-0.5 text-xs w-max bg-purple-900/40 text-purple-300 rounded-full">
            {type}
          </span>
        </div>
      </Link>

      {/* Remove button */}
      <button
        // onClick={handleRemove}
        className="absolute top-2 right-2 p-1.5 bg-red-900/20 hover:bg-red-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Remove item"
      >
        <Trash2 className="w-3.5 h-3.5 text-red-400" />
      </button>
    </div>
  )
}
