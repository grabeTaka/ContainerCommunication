import { UserSchema } from "@/schemas";
import { Request, Response } from 'express'

export interface IUserController {
    create(req: Request, res: Response): Promise<UserSchema>
    getAll(req: Request, res: Response): Promise<UserSchema[]>
    getById(req: Request, res: Response): Promise<UserSchema>
    delete(req: Request, res: Response): Promise<UserSchema>
    updateById(req: Request, res: Response): Promise<UserSchema>
}