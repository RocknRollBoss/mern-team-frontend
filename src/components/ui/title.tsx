import { createElement } from "react"
type TitleSize = "xs" | "sm" | "md" | "lg" | "xl"
type Props = {
  size: TitleSize
  className?: string
  text: string
}
export const Title: React.FC<Props> = ({ size = "md", className, text }) => {
  const titleBySize = {
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
  }

  return createElement(titleBySize[size], { className: className }, text)
}
