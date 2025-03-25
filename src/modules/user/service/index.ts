import { IUser } from "@/types/user";
import { IUserService } from "./type"
import { CreateUserUseCase } from "../useCases/createUserUseCase";
import { FindByFilterUseCase } from "../useCases/findByFilterUseCase";
import { FindAllUsersUseCase } from "../useCases/findAllUseCase";
import { FindUserByIdUseCase } from "../useCases/findUserByIdUseCase";
import { DeleteUserUseCase } from "../useCases/deleteUserUseCase";
import { UpdateByIdUseCase } from "../useCases/updateByIdUserUseCase";
import { DeleteDbResultSchema, UserSchema } from "@/schemas";
import { GetAddressFromCoordinatesUseCase } from "../useCases/getAddressFromCoordinatesUseCase";
import { GetGoordinatesFromAddressUseCase } from "../useCases/getCoordinatesFromAddressUseCase";

class UserService implements IUserService{
    async findAddressOrCoordinates(user: UserSchema): Promise<UserSchema> {
        if (!user.address) {
            const getAddressFromCoordinatesUseCase = new GetAddressFromCoordinatesUseCase()
            getAddressFromCoordinatesUseCase.prepare(user.coordinates as [number, number])
            user.address = await getAddressFromCoordinatesUseCase.execute()
        } else {
            const getGoordinatesFromAddressUseCase = new GetGoordinatesFromAddressUseCase()
            getGoordinatesFromAddressUseCase.prepare(user.address)
            user.coordinates = await getGoordinatesFromAddressUseCase.execute()
        }

        return user
    }
    
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