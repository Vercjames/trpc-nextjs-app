import { object, string, TypeOf } from "zod"

export const createUserSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is Required"),
  email: string({ required_error: "Email is Required" })
    .min(1, "Email is Required")
    .email("Invalid Email"),
  password: string({ required_error: "Password is Required" })
    .min(1, "Password is Required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string({ required_error: "Please confirm your password" })
    .min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
})

export const loginUserSchema = object({
  email: string({ required_error: "Email is Required" })
    .min(1, "Email is Required")
    .email("Invalid Email"),
  password: string({ required_error: "Password is Required" })
    .min(1, "Password is Required"),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>
export type LoginUserInput = TypeOf<typeof loginUserSchema>
