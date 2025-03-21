import React from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { RegisteredUser } from "@/app/services/types"

type Props = {
  user: RegisteredUser | null
}

const defaultUser = {
  fullName: "User",
  email: "user@gmail.com",
}
export const Profile: React.FC<Props> = ({ user }) => {
  const currentUser = user ? user : defaultUser
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <Avatar className="w-12 h-12 mb-1">
          <AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" />
        </Avatar>
        <p className="text-sm font-bold">{currentUser.fullName}</p>
        <p className="text-[10px] font-bold">{currentUser.email}</p>
      </div>
    </div>
  )
}
