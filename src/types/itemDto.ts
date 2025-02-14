export type ItemDTO = {
  id: string
  name: string
  image: string
  price: number
  rating: number
  type: string
  description: string
  created_at: string // `created_at` exists in DB but not in ItemType
}
