import { Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import React from "react"

export default function Nav() {
  return (
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
  )
}
