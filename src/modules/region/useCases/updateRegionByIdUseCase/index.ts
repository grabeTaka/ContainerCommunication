import { IUpdateRegionByIdUseCase } from './types'
import { regionModel } from '../../model';
import { RegionSchema, UpdateDbResultSchema } from '@/schemas';
import { NotFoundError } from '../../../../utils/errors/notFound';
import mongoose from 'mongoose';


export class UpdateRegionByIdUseCase implements IUpdateRegionByIdUseCase {
    id: mongoose.Types.ObjectId;
    value: Partial<RegionSchema>;
    userModel = regionModel;

    prepare = (id: string, value: Partial<RegionSchema>): void => {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
        }

        this.id = new mongoose.Types.ObjectId(id)

        this.value = value
    }
    execute = async (): Promise<UpdateDbResultSchema> => {
        const result = await this.userModel.updateOne({ _id: this.id }, { $set: this.value })
        if (result.modifiedCount)
            throw new NotFoundError({ message: "No records were updated from the database" })
        return result
    }
}
