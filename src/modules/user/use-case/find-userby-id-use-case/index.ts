import { IFindUserByIdUseCase } from '@/modules/user/useCases/findUserByIdUseCase/types'
import { userModel } from '@/modules/user/model';
import { UserSchema } from '@/schemas';
import { mongoose } from '@typegoose/typegoose';
import { NotFoundError } from '@/utils/errors/not-found';
import { BadRequestError } from '@/utils/errors/bad-request';


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
