import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-screen w-full px-6  ">
      <div className="font-bold text-4xl text-center max-w-3xl">
        Wazaar – The Premier Marketplace for Enchanted Artifacts
      </div>
      <div className="text-center text-lg text-gray-300 max-w-2xl">
        Your ultimate destination for rare and powerful magical artifacts. From
        ancient relics to modern enchanted tools, discover a curated selection
        of mystical items that bring magic into your life.
      </div>
      <button className="px-6 py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition-all duration-300">
        Start Exploring
      </button>
    </div>
  )
}
