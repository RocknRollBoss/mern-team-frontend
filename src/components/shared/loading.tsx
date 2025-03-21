import React from "react"
import { LoaderCircle } from "lucide-react"
import { cn } from "@/lib/utils"
type Props = {
  className?: string
}
export const Loading: React.FC<Props> = ({ className }) => {
  return <LoaderCircle className={cn("h-7 w-7 animate-spin", className)} />
}
