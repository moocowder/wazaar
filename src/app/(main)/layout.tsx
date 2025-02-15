"use client"
import Cart from "@/components/cart"
import Nav from "@/components/nav"
import { queryClient } from "@/lib/reactQuery"
import useCartStore from "@/stores/cart"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { visible } = useCartStore()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div>
        <Nav />
        {visible && <Cart />}
        {children}
      </div>
    </QueryClientProvider>
  )
}
