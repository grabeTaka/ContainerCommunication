import { IUser } from "@/types/user";
import { Request, Response } from 'express'

export interface IUserController {
    create(req: Request, res: Response): Promise<IUser>
    getAll(req: Request, res: Response): Promise<IUser[]>
    getById(req: Request, res: Response): Promise<IUser>
    delete(req: Request, res: Response): Promise<IUser>
    updateById(req: Request, res: Response): Promise<IUser>
}