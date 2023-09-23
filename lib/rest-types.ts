import * as z from "zod"

const registrationSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
})

export type RegistrationData = z.infer<typeof registrationSchema>

export const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export type LoginData = z.infer<typeof loginSchema>