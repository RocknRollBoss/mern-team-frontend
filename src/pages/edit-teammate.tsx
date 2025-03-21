import React from "react"
import { Layout } from "@/components/shared/layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input, Title } from "@/components/ui"
import { useNavigate, useParams } from "react-router-dom"
import {
  useEditTeammateMutation,
  useGetTeammateQuery,
} from "@/app/services/teamApi"
import { RoutesEnum } from "@/Routes"
import { skipToken } from "@reduxjs/toolkit/query"
import { Loading } from "@/components/shared"
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  address: z.string().min(3, {
    message: "Email must be at least 3 characters.",
  }),
  age: z.string().min(1, {
    message: "Password must be at least 1 characters.",
  }),
  position: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
})
export const EditTeammate: React.FC = () => {
  const { id } = useParams()
  const { data: teammate, isLoading } = useGetTeammateQuery(id ?? skipToken)
  const [editTeammate] = useEditTeammateMutation()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: teammate?.name || "",
      address: teammate?.address || "",
      age: teammate?.age || "",
      position: teammate?.position || "",
    },
  })
  if (isLoading || !teammate) {
    return <Loading />
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const _id = id
    try {
      const teammate = await editTeammate({ ...values, _id }).unwrap()
      if (teammate) {
        navigate(RoutesEnum.HOME)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Title
              text="Edit Teammate"
              size="md"
              className="text-center font-bold"
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Name
                      "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  )
}
