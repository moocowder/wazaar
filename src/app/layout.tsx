import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Wazaar",
  description: "shop for your next magic item",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
