"use client"
import useCartStore from "@/stores/cart"
import { X, ShoppingCart } from "lucide-react"
import React, { useEffect } from "react"
import CartItem from "./cartItem"
import { useGetCartItems } from "@/services/cart.service"

export default function Cart() {
  const { toggleVisible } = useCartStore()
  const { isError, isPending, error, data: items } = useGetCartItems()

  // Add ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleVisible()
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [toggleVisible])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop - clicking outside closes the cart */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleVisible}
      />

      {/* Cart panel */}
      <div className="relative w-full max-w-md h-full bg-gray-900 shadow-xl flex flex-col animate-slide-in-right">
        {/* Header with close button */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart
          </h2>
          {/* X button to close */}
          <button
            onClick={toggleVisible}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {isPending && <span>loading...</span>}
        <div className="m-4 flex flex-col gap-4">
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
    </div>
  )
}

// @keyframes slide-in-right {
//   from {
//     transform: translateX(100%);
//   }
//   to {
//     transform: translateX(0);
//   }
// }

// .animate-slide-in-right {
//   animation: slide-in-right 0.3s ease-out;
// }
