import { DeleteDbResultSchema } from "@/schemas"

export interface IDeleteUserUseCase {
    prepare: (id: string) => void
    execute: () => Promise<DeleteDbResultSchema>
}
