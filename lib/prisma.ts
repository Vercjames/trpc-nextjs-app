import { PrismaClient } from "@prisma/client"

const prismaSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaSingleton>
}

const prisma = globalThis.prisma ?? prismaSingleton()

if (process.env.NEXT_PUBLIC_BUILD_ENV === "local") globalThis.prisma = prisma

export { prisma }
