"use client"
import Card from "@/components/card"
import { CircleDot, Dot, Search, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function page() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const fetchArtifacts = async () => {
      const { data, error } = await supabase.from("items").select("*")
      if (error) console.error("Error fetching items:", error)
      else setItems(data)
    }

    fetchArtifacts()
  }, [])

  useEffect(() => {
    if (items) console.log(items)
  }, [items])
  return (
    <div>
      <div className="flex h-16 px-4 items-center">
        <div className="w-20 h-12 flex items-center overflow-clip">
          <Image
            src="https://picsum.photos/300/200"
            width={80}
            height={40}
            alt="logo"
          />
        </div>

        <div className="flex gap-2 mx-8 h-12 items-center p-4 flex-1 rounded-full bg-black text-gray-400">
          <Search />
          <input
            className="flex-1 bg-transparent focus:outline-none text-white"
            placeholder="search..."
          />
        </div>
        <div className="px-6 flex items-center">
          <ShoppingCart />
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-12 m-8">
        {items.map((i) => (
          <Card
            key={i.id}
            id={i.id}
            name={i.name}
            price={i.price}
            rating={i.rating}
            type={i.type}
            imageUrl={`${
              supabase.storage.from("pics").getPublicUrl(i.image).data.publicUrl
            }`}
          />
        ))}
      </div>
    </div>
  )
}
