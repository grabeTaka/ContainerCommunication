import { z } from "zod"
import { userSchema, createUserSchema, updateUserSchema } from "./user"
import { deleteDbResultSchema, updateDbResultSchema } from "./generic"

export type UserSchema = z.infer<typeof userSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
export type DeleteDbResultSchema = z.infer<typeof deleteDbResultSchema>
export type UpdateDbResultSchema = z.infer<typeof updateDbResultSchema>