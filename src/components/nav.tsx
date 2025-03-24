"use client"
import { useGetCartItems } from "@/services/cart.service"
import useCartStore from "@/stores/cart"
import { Menu, Search, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

export default function Nav() {
  const { isError, isPending, error, data: items } = useGetCartItems()
  const { toggleVisible } = useCartStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const cartItemCount = items?.length || 0

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/explore" className="flex-shrink-0 flex items-center">
            <Image
              src="https://picsum.photos/300/200"
              width={80}
              height={40}
              alt="logo"
              className="rounded-md"
            />
          </Link>

          {/* Search Bar */}
          <div
            className={`hidden md:flex items-center flex-1 max-w-md mx-4 rounded-full bg-gray-800 border ${
              searchFocused ? "border-purple-500" : "border-gray-700"
            } overflow-hidden transition-all duration-200`}
          >
            <div className="flex items-center w-full px-4 py-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                className="ml-2 flex-1 bg-transparent focus:outline-none text-white placeholder-gray-400"
                placeholder="Search for magical items..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={toggleVisible}
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/explore"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Deals
            </Link>

            {/* Mobile Search */}
            <div className="mt-3 px-2 relative">
              <div className="flex items-center w-full px-3 py-2 rounded-md bg-gray-700">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  className="ml-2 flex-1 bg-transparent focus:outline-none text-white placeholder-gray-400"
                  placeholder="Search for magical items..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
