import { z } from "zod"
import { userSchema, createUserSchema, updateUserSchema } from "./user"

export type UserSchema = z.infer<typeof userSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>

// TODO melhorar descrição de erro para coordenadas inválidas
// TODO revisar validação para criação de usuário, quando não é passado nenhuma informação address ou coordinates o erro da estranho