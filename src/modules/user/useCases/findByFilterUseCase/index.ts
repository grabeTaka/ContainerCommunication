import { IUser } from '@/types/user'
import { IFindByFilterUseCase } from './types'
import { userModel } from '../../model';


export class FindByFilterUseCase implements IFindByFilterUseCase {
    value: string | number;
    key: string
    userModel = userModel;

    prepare = (value: string | number, key: string): void => {
        this.value = value
        this.key = key
    }
    execute = async (): Promise<IUser[]> => {
        const filter = {
            key: '',
            value: this.value
        }

        switch (this.key) {
            case "email":
                filter.key = "email"
                break;

            case "name":
                filter.key = "name"
                break;
            
            default:
                break;
        }

        return this.userModel.find({[filter.key]: this.value})
    }
}
