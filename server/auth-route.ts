import { createUserSchema,loginUserSchema, CreateUserInput, LoginUserInput} from "@/lib/user-schema";
import { protectedProcedure, publicProcedure, t} from "@/utils/trpc-server"
import { loginHandler, logoutHandler, registerHandler} from "@/server/auth-controller";

const authRouter = t.router({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }: { input: CreateUserInput }) => registerHandler({ input })),
  loginUser: publicProcedure
    .input(loginUserSchema)
    .mutation(({ input }: { input: CreateUserInput }) => loginHandler({ input })),
  logoutUser: protectedProcedure.mutation(() => logoutHandler())
})

export default authRouter
