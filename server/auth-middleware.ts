import { TRPCError } from "@trpc/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

// Application Component || Define Exports
// =================================================================================================
// =================================================================================================
export const deserializeUser = async () => {
  const cookieStore = cookies()
  try {
    let token: string
    if (cookieStore.get("token")) {
      token = cookieStore.get("token")?.value
    }
    const notAuthenticated = {
      user: null,
    }

    if (!token) {
      return notAuthenticated
    }

    const secret = process.env.JWT_SECRET!
    const decoded = jwt.verify(token, secret) as { sub: string }

    if (!decoded) {
      return notAuthenticated
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.sub } })

    const { password, ...userWithoutPassword } = user
    return {
      user: userWithoutPassword,
    }
  } catch (err: any) {
    console.log("error here?")
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    })
  }
}
