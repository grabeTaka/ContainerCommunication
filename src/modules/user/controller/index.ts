import { Request, Response } from 'express'

import { IUserController } from "./types"
import { IUserService } from "../service/type"
import userService from "../service"
import { IUser } from "@/types/user"
import { BadRequestError } from '../../../utils/errors/badRequest'
import { fromRequest } from '../../../utils/fromRequest'
import { User } from '../model'

class UserController implements IUserController{
    userService: IUserService

    constructor() {
        this.userService = userService
    }
    create = async (req: Request, res: Response): Promise<IUser> => {
        const {user} = req.body;
        
        const userAlreadyRegistered = await this.userService.findByFilter(user.email, 'email')

        if (userAlreadyRegistered.length > 0) {
            throw new BadRequestError({ message: 'User already registered in database' })
        }
        return await this.userService.create(user);
    }

    getAll = async (req: Request, res: Response): Promise<IUser[]> => {
        const results = await this.userService.getAll()
        return results;
    }

    getById = async (req: Request, res: Response): Promise<IUser> => {
        const id: string = fromRequest(req, 'params', 'id', true)
        const result = await this.userService.getById(id)
        return result;
    }

    async delete(req: Request, res: Response): Promise<User> {
        const id: string = fromRequest(req, 'params', 'id', true)
        const result = await this.userService.delete(id)
        return result;
    }

    async updateById(req: Request, res: Response): Promise<IUser> {
        const id: string = fromRequest(req, 'params', 'id', true)
        const user: Partial<IUser> = fromRequest(req, 'body', 'user', true)
        return await this.userService.updateById(id, user)

    }

}

const userController = new UserController()
export default userController
