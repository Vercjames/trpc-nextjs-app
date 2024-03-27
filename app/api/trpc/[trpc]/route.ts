import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "../trpc-router"
import { createContext } from "@/utils/trpc-context"

// Application Component || Define Handler
// =================================================================================================
// =================================================================================================
const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`)
  return fetchRequestHandler({
    req: request,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: createContext,
  })
}

// Application Component || Define Exports
// =================================================================================================
// =================================================================================================
export {
  handler as GET,
  handler as POST,
}
