"use client"
import Card from "@/components/card"
import { useGetItems } from "@/services/item.service"

export default function page() {
  const { isPending, isError, error, data: items } = useGetItems()

  if (isPending) return <div>pending....</div>
  if (isError) return <div>error.. {error.message}</div>

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-12 sm:m-8">
        {items &&
          items.map((i) => (
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
