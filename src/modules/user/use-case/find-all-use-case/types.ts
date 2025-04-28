import { UserSchema } from "@/schemas";

export interface IFindAllUsersUseCase {
    execute: () => Promise<UserSchema[]>
}
