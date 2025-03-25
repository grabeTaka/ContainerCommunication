import { IFindRegionByIdUseCase } from './types'
import { regionModel } from '../../model';
import { RegionSchema } from '@/schemas';
import mongoose from 'mongoose';
import { NotFoundError } from '../../../../utils/errors/notFound';


export class FindRegionByIdUseCase implements IFindRegionByIdUseCase {
    id: mongoose.Types.ObjectId;
    regionModel = regionModel;

    prepare(id: string): void {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
        }

        this.id = new mongoose.Types.ObjectId(id)
    }
    
    execute = async (): Promise<RegionSchema> => {
        const result = await this.regionModel.findById(this.id)
        console.log(result)

        if (!result) 
            throw new NotFoundError({message: 'Region not found'})
        return result
    }
}
