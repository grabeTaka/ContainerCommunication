import { IFindAllRegionsUseCase } from './types'
import { regionModel } from '../../model';
import { UserSchema } from '@/schemas';


export class FindAllRegionsUseCase implements IFindAllRegionsUseCase {
    regionModel = regionModel;

    execute = async (): Promise<UserSchema[]> => {
        return await this.regionModel.find()
    }
}
