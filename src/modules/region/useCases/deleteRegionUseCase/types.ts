import { DeleteDbResultSchema, RegionSchema } from "@/schemas"

export interface IDeleteRegionUseCase {
    prepare: (id: string) => void
    execute: () => Promise<DeleteDbResultSchema>
}
