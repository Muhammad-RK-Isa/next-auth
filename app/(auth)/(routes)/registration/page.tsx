"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RegistrationData } from "@/lib/rest-types"

const formSchema = z
    .object({
        name: z.string().min(3).max(20),
        email: z.string().email(),
        password: z
            .string()
            .min(6)
            .refine((value) => value.match(/\d/), { message: "Password must contain at least one number." })
            .refine((value) => value.match(/[a-zA-Z]/), { message: "Password must contain at least one letter." }),
        confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Passwords do not match!",
        path: ["confirm"],
    })


const RegistrationPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm: "",
        }
    })

    const [loading, setLoading] = useState(false)

    const register = async (values: z.infer<typeof formSchema>) => {
        const payload: RegistrationData = {
            name: values.name,
            email: values.email,
            password: values.password,
        }

        try {
            const result = await axios.post('/api/auth/registration', payload)
            console.log(result)
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data)
            }
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="my-8 text-4xl font-semibold">Register</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(register)} className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="Username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <Input
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
                    >Register</Button>
                </form>
            </Form>
        </div>
    )
}

export default RegistrationPage