"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Bouton from "@/components/bouton"

export default function Home() {
  const router = useRouter()
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
      <Bouton
        type="primary"
        onClick={() => router.push("/explore")}
        className="w-64"
      >
        Start Exploring
      </Bouton>
    </div>
  )
}
