import React from "react"
import { Header } from "./header"

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-[1220px] mx-auto px-[10px]">
      <Header />
      {children}
    </div>
  )
}
