import bcrypt from "bcrypt"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"
import { RegistrationData } from "@/lib/rest-types"

export async function POST(
    req: Request
) {
    try {
        const { name, email, password }: RegistrationData = await req.json()
        if (!name) return new NextResponse('username is required!', { status: 400 })
        if (!email) return new NextResponse('email is required!', { status: 400 })
        if (!password) return new NextResponse('password is required!', { status: 400 })

        const existingUser = await prismadb.user.findFirst({
            where: {
                email,
            }
        })

        if (existingUser) return new NextResponse('User already exists!', { status: 409 })

        const hshdpasswd = await bcrypt.hash(password, 10)

        const user = await prismadb.user.create({
            data: {
                name,
                email,
                hshdpasswd
            }
        })

        return NextResponse.json(user)

    } catch (error) {
        console.error("[REGISTRATION_POST")
        return new NextResponse("Internal error", { status: 500 })
    }
}