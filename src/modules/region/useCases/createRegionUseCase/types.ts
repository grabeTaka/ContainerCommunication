import { RegionSchema } from '@/schemas'

export interface ICreateRegionUseCase {
    prepare: (user: RegionSchema) => void
    execute: () => Promise<RegionSchema>
}
