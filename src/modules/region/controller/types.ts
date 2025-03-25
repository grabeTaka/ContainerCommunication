import { DeleteDbResultSchema, RegionSchema, UpdateDbResultSchema } from "@/schemas";
import { Request, Response } from 'express'

export interface IRegionController {
    create(req: Request, res: Response): Promise<RegionSchema>
    getAll(req: Request, res: Response): Promise<RegionSchema[]>
    getById(req: Request, res: Response): Promise<RegionSchema>
    delete(req: Request, res: Response): Promise<DeleteDbResultSchema>
    update(req: Request, res: Response): Promise<UpdateDbResultSchema>
}