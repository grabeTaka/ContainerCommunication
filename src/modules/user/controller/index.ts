import { Request, Response } from 'express'

import { IUserController } from "@/modules/user/controller/types"
import { IUserService } from "@/modules/user/service/type"
import userService from "@/modules/user/service"

import { ConflictError } from '@/utils/errors/conflictRequest'
import { fromRequest } from '@/utils/fromRequest'
import { DeleteDbResultSchema, UserSchema } from '@/schemas/index'
import { parserSchemaValidations } from '@/utils/zod/parserSchemaValidations'
import { createUserSchema, updateUserSchema } from '@/schemas/user'

class UserController implements IUserController{
    userService: IUserService

    constructor() {
        this.userService = userService
    }
    create = async (req: Request, res: Response): Promise<UserSchema> => {
        const { body } = await parserSchemaValidations(createUserSchema, req )
        const users = await this.userService.findByFilter(body.email, 'email')

        if (users.length > 0)
            throw new ConflictError({ message: 'User already registered in database' })

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

    delete = async (req: Request, res: Response): Promise<DeleteDbResultSchema> => {
        const id: string = fromRequest(req, 'params', 'id', true)
        const result = await this.userService.delete(id)
        return result;
    }

    update = async (req: Request, res: Response): Promise<UserSchema> => {
        const { body, params } = await parserSchemaValidations(updateUserSchema, req )
        return await this.userService.update(params.id, body)
    }
}

const userController = new UserController()
export default userController
