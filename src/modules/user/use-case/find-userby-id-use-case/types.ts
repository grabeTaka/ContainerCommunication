import { UserSchema } from '@/schemas'
export interface IFindUserByIdUseCase {
    prepare(id: string): void
    execute: () => Promise<UserSchema>
}
