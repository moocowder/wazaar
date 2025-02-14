"use client"
import Card from "@/components/card"
import { CircleDot, Dot, Search, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Nav from "@/components/nav"
import { ItemType } from "@/types/item"

export default function page() {
  const [items, setItems] = useState<ItemType[]>([])

  useEffect(() => {
    const fetchArtifacts = async () => {
      const { data, error } = await supabase.from("items").select("*")
      if (error) console.error("Error fetching items:", error)
      else setItems(data)
    }

    fetchArtifacts()
  }, [])

  return (
    <div>
      <div className="flex flex-wrap justify-around gap-12 m-8">
        {items.map((i) => (
          <Card
            key={i.id}
            id={i.id}
            name={i.name}
            price={i.price}
            rating={i.rating}
            type={i.type}
            image={i.image}
          />
        ))}
      </div>
    </div>
  )
}
