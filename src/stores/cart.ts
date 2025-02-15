import { create } from "zustand"

type CartStore = {
  visible: boolean
  toggleVisible: () => void
}

const useCartStore = create<CartStore>()((set, get) => ({
  visible: false,
  toggleVisible: () => set((state) => ({ visible: !state.visible })),
}))

export default useCartStore
