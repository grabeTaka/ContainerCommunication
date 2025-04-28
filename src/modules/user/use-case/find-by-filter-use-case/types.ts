import { UserSchema } from '@/schemas'

export interface IFindByFilterUseCase {
    prepare: (value: string | number, key: string) => void
    execute: () => Promise<UserSchema[]>
}
