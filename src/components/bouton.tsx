import React from "react"

interface Props {
  type?: "primary" | "secondary"
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  loading?: boolean
  children: React.ReactNode
  className?: string
}

export default function Bouton({
  type = "secondary",
  onClick,
  loading,
  children,
  className,
}: Props) {
  return (
    <button
      onClick={(e) => onClick(e)}
      className={`px-6 py-3 text-lg font-semibold text-white rounded-xl transition-all duration-300 ${
        type === "primary"
          ? "bg-purple-600 hover:bg-purple-700"
          : "border border-purple-600 hover:bg-purple-600"
      } ${className}`}
    >
      {children}
    </button>
  )
}
