import { ICreateRegionUseCase } from './types'
import { regionModel } from '../../model';
import { RegionSchema } from '@/schemas';


export class CreateRegionUseCase implements ICreateRegionUseCase {
    region: Partial<RegionSchema>;
    regionModel = regionModel;

    prepare = (region: Partial<RegionSchema>): void => {
        this.region = region
    }
    execute = async (): Promise<RegionSchema> => {
        return await this.regionModel.create(this.region)

    }
}
