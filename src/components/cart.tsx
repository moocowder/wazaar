import useCartStore from "@/stores/cart"
import { X } from "lucide-react"
import React from "react"
import CartItem from "./cartItem"
import { useGetCartItems } from "@/services/cart.service"

export default function Cart() {
  const { toggleVisible } = useCartStore()
  const { isError, isPending, error, data: items } = useGetCartItems()

  return (
    <div className="p-2 w-72 h-screen bg-black fixed bottom-0 right-0">
      <X
        strokeWidth={5}
        onClick={toggleVisible}
        color="red"
        className="cursor-pointer m-4 ml-auto"
      />
      {isPending && <span>loading...</span>}
      <div className="flex flex-col gap-4">
        {items &&
          items.map((i) => (
            <CartItem
              key={i.id}
              id={i.id}
              name={i.name}
              image={i.image}
              price={i.price}
              rating={i.rating}
              type={i.type}
            />
          ))}
      </div>
    </div>
  )
}
