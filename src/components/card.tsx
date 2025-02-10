import { Star } from "lucide-react"
import Image from "next/image"
import React from "react"

interface Props {
  id: number
  name: string
  price: number
  rating: number
  type: string
}

export default function Card({ id, name, price, rating, type }: Props) {
  return (
    <div className="p-2 w-64 flex flex-col items-center">
      <Image
        src="https://picsum.photos/200/200"
        alt="item image"
        width={200}
        height={200}
      />
      <div className="mt-4 text-3xl">{name}</div>
      <div className="mb-4 text-xl">{price}</div>
      <div className="w-full flex justify-between">
        <span className="flex items-center gap-1">
          <Star color="yellow" />
          {rating}
        </span>
        <span className="px-2 inline-flex items-center w-max bg-[#FF000030] text-sm text-red-700 rounded-full">
          {type}
        </span>
      </div>
    </div>
  )
}
