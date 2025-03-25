import { DeleteDbResultSchema, RegionSchema, UpdateDbResultSchema, UserSchema } from "@/schemas";

export interface IRegionService {
    create(user: RegionSchema): Promise <RegionSchema>
    getAll(): Promise <RegionSchema[]>
    getById(id: string): Promise <RegionSchema> 
    delete(id: string): Promise <DeleteDbResultSchema>
    update(id: string, value: Partial <UserSchema>): Promise<UpdateDbResultSchema>
}