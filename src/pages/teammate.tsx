import {
  useDeleteTeammateMutation,
  useGetTeammateQuery,
} from "@/app/services/teamApi"
import { Layout, Loading } from "@/components/shared"
import { skipToken } from "@reduxjs/toolkit/query"
import { Link, useNavigate, useParams } from "react-router-dom"
import React from "react"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui"
import { useSelector } from "react-redux"
import { userSelector } from "@/features/authSlice"
import { Deletemodal } from "@/components/shared/delete-modal"
import { RoutesEnum } from "@/Routes"
import { Eye } from "lucide-react"

export const Teammate: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: teammate, isLoading } = useGetTeammateQuery(id ?? skipToken)
  const [deleteTeammate] = useDeleteTeammateMutation()
  const user = useSelector(userSelector)

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }
  const handleDeleteTeammate = async () => {
    try {
      await deleteTeammate(id || "")
      navigate(RoutesEnum.HOME)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <Avatar className="w-16 h-16 mb-1">
            <AvatarImage
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              className="rounded-full"
            />
          </Avatar>

          <CardTitle className="text-2xl mb-1">{teammate.name}</CardTitle>
          <CardTitle className="font-normal text-gray-500 mb-1">
            {teammate.address}
          </CardTitle>
          <CardTitle className="font-normal flex gap-2 items-center">
            <p>{teammate.age} age,</p>
            <p> {teammate.position} ,</p>
            <div className="flex items-center gap-2">
              <Eye className="w-8 h-8" />
              <p>{teammate.viewsCount}</p>
            </div>
          </CardTitle>
        </CardHeader>
        {teammate && user?._id === teammate.user && (
          <CardFooter className="flex gap-2">
            <Link to={`${RoutesEnum.EDIT}/${teammate._id}`}>
              <Button>Edit</Button>
            </Link>
            <Deletemodal deleteTeammate={handleDeleteTeammate} />
          </CardFooter>
        )}
      </Card>
    </Layout>
  )
}
