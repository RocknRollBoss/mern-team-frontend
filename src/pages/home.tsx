import { useGetCurrentQuery } from "@/app/services/authApi"
import { Layout, Profile, Team } from "@/components/shared"
import { Button } from "@/components/ui"
import { userSelector } from "@/features/authSlice"
import { RoutesEnum } from "@/Routes"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const Home: React.FC = () => {
  const { data } = useGetCurrentQuery()
  const user = useSelector(userSelector)
  return (
    <Layout>
      <div className="mb-[50px] flex justify-between items-center">
        <Profile user={user} />
        <Link to={RoutesEnum.ADD}>
          <Button variant="secondary">Add teammate</Button>
        </Link>
      </div>
      <Team />
    </Layout>
  )
}
