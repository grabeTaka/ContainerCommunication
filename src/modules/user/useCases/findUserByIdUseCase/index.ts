import { IFindUserByIdUseCase } from './types'
import { userModel } from '../../model';
import { UserSchema } from '@/schemas';
import { mongoose } from '@typegoose/typegoose';
import { NotFoundError } from '../../../../utils/errors/notFound';
import { BadRequestError } from '../../../..//utils/errors/badRequest';


export class FindUserByIdUseCase implements IFindUserByIdUseCase {
    id: mongoose.Types.ObjectId;
    userModel = userModel;

    prepare(id: string): void {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestError({message: 'Invalid ObjectId'});
        }

        this.id = new mongoose.Types.ObjectId(id)
    }

    execute = async (): Promise<UserSchema> => {
        const result = await this.userModel.findById(this.id)
        if (!result)
            throw new NotFoundError({ message: 'User not found' })
        return result
    }
}
