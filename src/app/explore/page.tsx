import Card from "@/components/card"
import { CircleDot, Dot, Search, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import React from "react"

export default function page() {
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
        <Card
          id={3}
          name="the new thing"
          price={3200}
          rating={4.2}
          type="artifacts & relics"
        />
        <Card
          id={3}
          name="the new thing"
          price={3200}
          rating={4.2}
          type="artifacts & relics"
        />
        <Card
          id={3}
          name="the new thing"
          price={3200}
          rating={4.2}
          type="artifacts & relics"
        />
        <Card
          id={3}
          name="the new thing"
          price={3200}
          rating={4.2}
          type="artifacts & relics"
        />
      </div>
    </div>
  )
}
