import { Request, Response } from 'express'

import { IUserController } from "./types"
import { IUserService } from "../service/type"
import userService from "../service"

import { BadRequestError } from '../../../utils/errors/badRequest'
import { fromRequest } from '../../../utils/fromRequest'
import { UserSchema } from '../../../schemas/index'
import { parserSchemaValidations } from '../../../utils/zod/parserSchemaValidations'
import { createUserSchema } from '../../../schemas/user'

class UserController implements IUserController{
    userService: IUserService

    constructor() {
        this.userService = userService
    }
    create = async (req: Request, res: Response): Promise<UserSchema> => {
        const { body } = await parserSchemaValidations(createUserSchema, req )
        const users = await this.userService.findByFilter(body.email, 'email')

        if (users.length > 0)
            throw new BadRequestError({ message: 'User already registered in database' })

        const userData = await this.userService.findAddressOrCoordinates(body)

        console.log('------------')
        console.log(userData);
        console.log('------------')

        return await this.userService.create(body);
    }

    getAll = async (req: Request, res: Response): Promise<UserSchema[]> => {
        const results = await this.userService.getAll()
        return results;
    }

    getById = async (req: Request, res: Response): Promise<UserSchema> => {
        const id: string = fromRequest(req, 'params', 'id', true)
        const result = await this.userService.getById(id)
        return result;
    }

    delete = async (req: Request, res: Response): Promise<UserSchema> => {
        const id: string = fromRequest(req, 'params', 'id', true)
        const result = await this.userService.delete(id)
        return result;
    }

    updateById = async (req: Request, res: Response): Promise<UserSchema> => {
        const id: string = fromRequest(req, 'params', 'id', true)
        const user: Partial<UserSchema> = fromRequest(req, 'body', 'user', true)
        return await this.userService.updateById(id, user)
    }
}

const userController = new UserController()
export default userController
