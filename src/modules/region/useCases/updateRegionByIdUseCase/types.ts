import { RegionSchema, UpdateDbResultSchema } from '@/schemas'

export interface IUpdateRegionByIdUseCase {
    prepare: (id: string, value: Partial<RegionSchema>) => void
    execute: () => Promise<UpdateDbResultSchema>
}
