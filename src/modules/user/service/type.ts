import { DeleteDbResultSchema, UserSchema } from "@/schemas";

export interface IUserService {
    create(user: UserSchema): Promise <UserSchema>
    findAddressOrCoordinates(user: UserSchema): Promise <UserSchema>
    getAll(): Promise <UserSchema[]>
    findByFilter(value: string | number, key: string): Promise <UserSchema[]>
    getById(id: string): Promise <UserSchema> 
    delete(id: string): Promise <DeleteDbResultSchema> 
    update(id: string, value: Partial <UserSchema>)
}