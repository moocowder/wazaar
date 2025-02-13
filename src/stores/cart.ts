import { ItemType } from "@/types/item"
import { create } from "zustand"

type CartStore = {
  items: ItemType[]
  addItem: (i: ItemType) => void
  visible: boolean
  toggleVisible: () => void
  hasItem: (id: string) => boolean
  removeItem: (id: string) => void
}

const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  addItem: (i) =>
    set((state) => ({
      items: state.items.some((item) => item.id === i.id) // Check if item already exists
        ? state.items // Return same state if duplicate
        : [...state.items, i], // Add new item if not a duplicate
    })),
  visible: false,
  toggleVisible: () => set((state) => ({ visible: !state.visible })),
  hasItem: (id) => get().items.some((i) => i.id === id),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
}))

export default useCartStore
// function Counter() {
//   const { count, inc } = useStore()
//   return (
//     <div>
//       <span>{count}</span>
//       <button onClick={inc}>one up</button>
//     </div>
//   )
// }
