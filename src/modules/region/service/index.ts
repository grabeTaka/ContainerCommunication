import { IRegionService } from "./type"
import { CreateRegionUseCase } from "../useCases/createRegionUseCase";
import { DeleteDbResultSchema, RegionSchema, UpdateDbResultSchema, UserSchema } from "@/schemas";
import { FindAllRegionsUseCase } from "../useCases/findAllRegionsUseCase";
import { FindRegionByIdUseCase } from "../useCases/findRegionByIdUseCase";
import { DeleteRegionUseCase } from "../useCases/deleteRegionUseCase";
import { UpdateRegionByIdUseCase } from "../useCases/updateRegionByIdUseCase";


class RegionService implements IRegionService{

    create = (user: Partial<RegionSchema>): Promise<RegionSchema> => {
        const createRegionUseCase = new CreateRegionUseCase();
        createRegionUseCase.prepare(user)
        return createRegionUseCase.execute()
    }

    getAll(): Promise<RegionSchema[]> {
        const findAllRegionsUseCase = new FindAllRegionsUseCase()
        return findAllRegionsUseCase.execute()
    }

    getById(id: string): Promise<RegionSchema> {
        const findRegionByIdUseCase = new FindRegionByIdUseCase();
        findRegionByIdUseCase.prepare(id)
        return findRegionByIdUseCase.execute()
    }

    delete(id: string): Promise<DeleteDbResultSchema> {
        const deleteRegionUseCase = new DeleteRegionUseCase()
        deleteRegionUseCase.prepare(id)
        return deleteRegionUseCase.execute()
    }

    update(id: string, value: Partial<UserSchema>) {
        const updateRegionByIdUseCase = new UpdateRegionByIdUseCase()
        updateRegionByIdUseCase.prepare(id, value)
        return updateRegionByIdUseCase.execute()
    }
}

const regionService = new RegionService()
export default regionService