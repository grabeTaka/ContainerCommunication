import { IUserService } from "@/modules/user/service/type"
import { CreateUserUseCase } from "@/modules/user/useCases/createUserUseCase";
import { FindByFilterUseCase } from "@/modules/user/useCases/findByFilterUseCase";
import { FindAllUsersUseCase } from "@/modules/user/useCases/findAllUseCase";
import { FindUserByIdUseCase } from "@/modules/user/useCases/findUserByIdUseCase";
import { DeleteUserUseCase } from "@/modules/user/useCases/deleteUserUseCase";
import { UpdateByIdUseCase } from "@/modules/user/useCases/updateByIdUserUseCase";
import { DeleteDbResultSchema, UserSchema } from "@/schemas";

class UserService implements IUserService{    
    getById(id: string): Promise<UserSchema> {
        const findUserByIdUseCase = new FindUserByIdUseCase();
        findUserByIdUseCase.prepare(id)
        return findUserByIdUseCase.execute()
    }
    getAll(): Promise<UserSchema[]> {
        const findAllUsersUseCase = new FindAllUsersUseCase()
        return findAllUsersUseCase.execute()
    }

    findByFilter(value: string | number, key: string) {
        const findByFilterUseCase = new FindByFilterUseCase()
        findByFilterUseCase.prepare(value, key)
        return findByFilterUseCase.execute()
    }
    
    create = (user: Partial<UserSchema>): Promise<UserSchema> => {
        const createUserUseCase = new CreateUserUseCase();
        createUserUseCase.prepare(user)
        return createUserUseCase.execute()
    }
    delete(id: string): Promise<DeleteDbResultSchema> {
        const deleteUserUseCase = new DeleteUserUseCase()
        deleteUserUseCase.prepare(id)
        return deleteUserUseCase.execute()
    }
    update(id: string, value: Partial<UserSchema>) {
        const updateByIdUseCase = new UpdateByIdUseCase()
        updateByIdUseCase.prepare(id, value)
        return updateByIdUseCase.execute()
    }
}

const userService = new UserService()
export default userService