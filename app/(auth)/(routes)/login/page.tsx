"use client"

import { useState } from "react"
import { signIn, signOut } from "next-auth/react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { LoginData } from "@/lib/rest-types"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const LoginPage = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async (values: z.infer<typeof formSchema>) => {
    const payload: LoginData = {
      email: values.email,
      password: values.password,
    }

    try {
      setLoading(true)
      const result = await signIn('credentials', { ...payload, redirect: false })
      console.log(result)
      if (result?.error === "USER_NOT_FOUND") {
        form.setError("email", { message: "User not found!" })
      }
      if (result?.error === "INCORRECT_PASSWORD") {
        form.setError("password", { message: "Password is incorrect!" })
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="my-8 text-4xl font-semibold">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(login)} className="grid space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="example@email.com"
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={loading}
          >Login</Button>
        </form>
      </Form>
      <div className="mt-4 flex items-center gap-2">
        <Button variant="outline" onClick={() => router.push('/registration')}>Register</Button>
        <Button variant="outline" onClick={() => signIn("google")}>Continue with Google</Button>
        <Button variant="outline" onClick={() => signIn("github")}>Continue with Github</Button>
        <Button variant="destructive" onClick={() => signOut()}>Sign Out</Button>
        <Button variant="destructive" onClick={() => router.push('/')}>Home</Button>
      </div>
    </div>
  )
}

export default LoginPage