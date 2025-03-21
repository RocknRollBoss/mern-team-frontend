import React from "react"
import { useGetTeamQuery } from "@/app/services/teamApi"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loading } from "."

import { ApiRoutes } from "@/app/services/api-routes"
import { useNavigate } from "react-router-dom"
const headers = ["Name", "Age", "Address", "Position"]
export const Team: React.FC = () => {
  const navigate = useNavigate()
  const { data: team, isLoading } = useGetTeamQuery()

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="pointer-events-none">
            {headers.map((head, idx) => (
              <TableHead
                key={idx}
                className="text-amber-300 text-lg last:text-right"
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {team &&
            team.map(teammate => (
              <TableRow
                key={teammate._id}
                onClick={() => navigate(`${ApiRoutes.TEAM}/${teammate._id}`)}
              >
                <TableCell className="font-medium py-3">
                  {teammate.name}
                </TableCell>
                <TableCell className="font-medium py-3">
                  {teammate.age}
                </TableCell>
                <TableCell className="font-medium py-3">
                  {teammate.address}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {teammate.position}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
