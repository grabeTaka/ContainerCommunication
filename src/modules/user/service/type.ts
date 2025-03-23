import { IUser } from "@/types/user";

export interface IUserService {
    create(user: IUser): Promise<IUser>
    getAll(): Promise<IUser[]>
    findByFilter(value: string | number, key: string): Promise<IUser[]>
    getById(id: string): Promise<IUser> 
    delete(id: string): Promise<IUser> 
    updateById(id: string, value: Partial<IUser>)
}