import { IUpdateByIdUseCase } from '@/modules/user/useCases/updateByIdUserUseCase/types'
import { userModel } from '@/modules/user/model/index';
import { UpdateDbResultSchema, UserSchema } from '@/schemas';
import { mongoose } from '@typegoose/typegoose';
import { BadRequestError } from '@/utils/errors/bad-request';


export class UpdateByIdUseCase implements IUpdateByIdUseCase {
    id: mongoose.Types.ObjectId;
    value: Partial<UserSchema>;
    userModel = userModel;

    prepare = (id: string, value: Partial<UserSchema>): void => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestError({ message: 'Invalid ObjectId' });
        }

        this.id = new mongoose.Types.ObjectId(id)
        this.value = value
    }

    execute = async (): Promise<UpdateDbResultSchema> => {
        const result = await this.userModel.updateOne({ _id: this.id }, { $set: this.value })
        return result
    }
}
