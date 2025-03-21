import React from "react"
import { Handshake } from "lucide-react"
import { Button, Title } from "../ui"
import { RoutesEnum } from "@/Routes"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, userSelector } from "@/features/authSlice"
import { ModeToggle } from "./mode-toggle"

export const Header: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector(userSelector)
  const onLogout = () => {
    localStorage.removeItem("token")
    localStorage.setItem("auth", "false")
    dispatch(logout())
  }

  return (
    <header className="flex justify-between mb-[50px] py-8  bg-gray-900">
      <Link to={RoutesEnum.HOME}>
        <div className="flex items-center">
          <Handshake className="w-8 h-8" />
          <Title size="xl" text="Our Team" className="pl-4 text-3xl" />
        </div>
      </Link>

      <div className="flex gap-4">
        <ModeToggle />
        {user ? (
          <Button variant="secondary" onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Link to={RoutesEnum.REGISTER}>
              <Button variant="secondary">Sign-Up</Button>
            </Link>
            <Link to={RoutesEnum.LOGIN}>
              <Button variant="secondary">Sign-In</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
