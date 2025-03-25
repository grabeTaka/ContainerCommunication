import { RegionSchema } from '@/schemas'
export interface IFindRegionByIdUseCase {
    prepare(id: string): void
    execute: () => Promise<RegionSchema>
}
