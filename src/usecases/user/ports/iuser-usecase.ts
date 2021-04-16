import { UserData } from "../../../entities/user/user-data"
import { UserResponse } from "./user-response";

export abstract class IUserUseCase {
    abstract add(user: UserData): Promise<UserResponse>
    abstract delete(id: any): Promise<UserData>
    abstract findAllUsers(): Promise<UserData[]>
    abstract findUserByEmail(email: string): Promise<UserData>
    abstract findUserById(id: any): Promise<UserData>
    abstract exists(email: string): Promise<boolean>
}
