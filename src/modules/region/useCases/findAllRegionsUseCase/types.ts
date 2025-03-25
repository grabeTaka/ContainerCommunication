import { RegionSchema, UserSchema } from "@/schemas";

export interface IFindAllRegionsUseCase {
    execute: () => Promise<RegionSchema[]>
}
