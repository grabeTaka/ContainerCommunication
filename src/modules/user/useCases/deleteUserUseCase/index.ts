import { IDeleteUserUseCase } from '@/modules/user/useCases/deleteUserUseCase/types'
import { userModel } from '@/modules/user/model';
import { DeleteDbResultSchema } from '@/schemas';
import { BadRequestError } from '@/utils/errors/badRequest';
import { NotFoundError } from '@/utils/errors/notFound';

import mongoose from 'mongoose';

export class DeleteUserUseCase implements IDeleteUserUseCase {
    id: mongoose.Types.ObjectId;
    userModel = userModel;

    prepare = (id: string): void => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestError({ message: 'Invalid ObjectId' });
        }

        this.id = new mongoose.Types.ObjectId(id)
    }

    execute = async (): Promise<DeleteDbResultSchema> => {
        const result = await this.userModel.deleteOne({ _id: this.id })
        
        if (!result.deletedCount)
            throw new NotFoundError({message: "No records were deleted from the database."})

        return result
    }
}
