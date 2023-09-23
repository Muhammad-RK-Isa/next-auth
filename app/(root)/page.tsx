import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import UserClient from "./components/user-client"


const HomePage = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      User server
      <pre>
        {JSON.stringify(session)}
      </pre>
      <UserClient />
    </div>
  )
}

export default HomePage