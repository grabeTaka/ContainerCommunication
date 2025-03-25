import { Request, Response } from 'express'

import { IRegionController } from "./types"

import { DeleteDbResultSchema, RegionSchema, UpdateDbResultSchema } from '../../../schemas/index'
import { parserSchemaValidations } from '../../../utils/zod/parserSchemaValidations'
import { createRegionSchema, updateRegionSchema } from '../../../schemas/region'
import { IRegionService } from '../service/type'
import regionService from '../service'
import { fromRequest } from '../../../utils/fromRequest'

class RegionController implements IRegionController{
    regionService: IRegionService

    constructor() {
        this.regionService = regionService
    }

    create = async (req: Request, res: Response): Promise<RegionSchema> => {
        const { body } = await parserSchemaValidations(createRegionSchema, req )

        return await this.regionService.create(body)
    }

    getAll = async (req: Request, res: Response): Promise<RegionSchema[]> => {
        const results = await this.regionService.getAll()
        return results;
    }

    getById = async (req: Request, res: Response): Promise<RegionSchema> => {
        const id: string = fromRequest(req, 'params', 'id', true)
        const result = await this.regionService.getById(id)
        return result;
    }

    delete = async (req: Request, res: Response): Promise<DeleteDbResultSchema> => {
        const id: string = fromRequest(req, 'params', 'id', true)
        const result = await this.regionService.delete(id)
        return result;
    }

    update = async (req: Request, res: Response): Promise<UpdateDbResultSchema> => {
        const { body, params } = await parserSchemaValidations(updateRegionSchema, req )
        const result = await this.regionService.update(params.id, body)
        return result
    }
}

const regionController = new RegionController()
export default regionController
