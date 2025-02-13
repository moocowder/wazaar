"use client"
import Cart from "@/components/cart"
import Nav from "@/components/nav"
import useCartStore from "@/stores/cart"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { visible } = useCartStore()
  return (
    <div>
      <Nav />
      {visible && <Cart />}
      {children}
    </div>
  )
}
