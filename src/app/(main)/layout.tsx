"use client"
import Cart from "@/components/cart"
import Nav from "@/components/nav"
import { supabase } from "@/lib/supabaseClient"
import useCartStore from "@/stores/cart"
import { ItemDTO } from "@/types/itemDto"
import { useEffect } from "react"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { visible, addItem } = useCartStore()
  useEffect(() => {
    const getCartItems = async () => {
      const { data, error } = await supabase
        .from("cart")
        .select("items(*)")
        .returns<{ items: ItemDTO }[]>()

      if (error) console.error("couldn't get items from cart")
      else {
        const items = data.map((entry) => entry.items)
        items.map((i) => addItem(i))
      }
    }

    getCartItems()
  }, [])

  return (
    <div>
      <Nav />
      {visible && <Cart />}
      {children}
    </div>
  )
}
