import { UpdateDbResultSchema, UserSchema } from '@/schemas'

export interface IUpdateByIdUseCase {
    prepare: (id: string, value: Partial<UserSchema>) => void
    execute: () => Promise<UpdateDbResultSchema>
}
