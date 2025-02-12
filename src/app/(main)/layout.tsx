import Nav from "@/components/nav"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}
