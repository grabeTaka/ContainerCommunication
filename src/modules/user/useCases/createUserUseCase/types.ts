import { UserSchema } from '@/schemas'

export interface ICreateUserUseCase {
    prepare: (user: UserSchema) => void
    execute: () => Promise<UserSchema>
}
