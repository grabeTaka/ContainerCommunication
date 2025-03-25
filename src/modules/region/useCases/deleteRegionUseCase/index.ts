import { IDeleteRegionUseCase } from './types'
import { regionModel } from '../../model';
import { DeleteDbResultSchema, UserSchema } from '@/schemas';


export class DeleteRegionUseCase implements IDeleteRegionUseCase {
    id: string;
    userModel = regionModel;

    prepare = (id: string): void => {
        this.id = id
    }
    execute = async (): Promise<DeleteDbResultSchema> => {
        return this.userModel.deleteOne({ _id: this.id })
    }
}
