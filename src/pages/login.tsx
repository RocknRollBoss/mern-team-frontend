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
import { useLoginMutation } from "@/app/services/authApi"
import { useNavigate } from "react-router-dom"
import { RoutesEnum } from "@/Routes"

const formSchema = z.object({
  email: z.string().min(3, {
    message: "Email must be at least 3 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
})
export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await login(values).unwrap()
      if (user) {
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
            <Title text="Login" size="md" className="text-center font-bold" />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
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
