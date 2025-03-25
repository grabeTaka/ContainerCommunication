import { z } from "zod"
import { userSchema, createUserSchema, updateUserSchema } from "./user"
import { createRegionSchema, regionSchema } from "./region"
import { deleteDbResultSchema, updateDbResultSchema } from "./generic"

export type UserSchema = z.infer<typeof userSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
export type RegionSchema = z.infer<typeof regionSchema>
export type CreateRegionSchema = z.infer<typeof createRegionSchema>
export type DeleteDbResultSchema = z.infer<typeof deleteDbResultSchema>
export type UpdateDbResultSchema = z.infer<typeof updateDbResultSchema>


// TODO melhorar descrição de erro para coordenadas inválidas
// TODO revisar validação para criação de usuário, quando não é passado nenhuma informação address ou coordinates o erro da estranho