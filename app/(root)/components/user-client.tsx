"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const UserClient = () => {

    const [isMounted, setIsMounted] = useState(false)

    if (!isMounted) null

    useEffect(() => {
        setIsMounted(true)
    }, [])


    const { data: session } = useSession()
    const router = useRouter()
    return (
        <div className="grid gap-4">
            UserClient
            <pre>{JSON.stringify(session)}</pre>
            <Button variant="outline" onClick={() => router.push('/login')}>Sign in</Button>
            <Button variant="destructive" onClick={() => signOut()}>Sign Out</Button>
        </div>
    )
}

export default UserClient