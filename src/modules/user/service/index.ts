import { IUser } from "@/types/user";
import { IUserService } from "./type"
import { CreateUserUseCase } from "../useCases/createUserUseCase";
import { FindByFilterUseCase } from "../useCases/findByFilterUseCase";
import { FindAllUsersUseCase } from "../useCases/findAllUseCase";
import { FindUserByIdUseCase } from "../useCases/findUserByIdUseCase";
import { DeleteUserUseCase } from "../useCases/deleteUserUseCase";
import { UpdateByIdUseCase } from "../useCases/updateByIdUserUseCase";

class UserService implements IUserService{
    getById(id: string): Promise<IUser> {
        const findUserByIdUseCase = new FindUserByIdUseCase();
        findUserByIdUseCase.prepare(id)
        return findUserByIdUseCase.execute()
    }
    getAll(): Promise<IUser[]> {
        const findAllUsersUseCase = new FindAllUsersUseCase()
        return findAllUsersUseCase.execute()
    }

    findByFilter(value: string | number, key: string) {
        const findByFilterUseCase = new FindByFilterUseCase()
        findByFilterUseCase.prepare(value, key)
        return findByFilterUseCase.execute()
    }
    
    create = (user: Partial<IUser>): Promise<IUser> => {
        const createUserUseCase = new CreateUserUseCase();
        createUserUseCase.prepare(user)
        return createUserUseCase.execute()
    }
    delete(id: string): Promise<IUser> {
        const deleteUserUseCase = new DeleteUserUseCase()
        deleteUserUseCase.prepare(id)
        return deleteUserUseCase.execute()
    }
    updateById(id: string, value: Partial<IUser>) {
        const updateByIdUseCase = new UpdateByIdUseCase()
        updateByIdUseCase.prepare(id, value)
        return updateByIdUseCase.execute()
    }
}

const userService = new UserService()
export default userService