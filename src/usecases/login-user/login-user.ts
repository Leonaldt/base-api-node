import { InvalidEmailError } from "../../entities/user/errors/invalid-email";
import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { Either, right, left } from "../../shared/either";
import { UserRepository } from "../ports/user-repository";
import { LoginUserResponse } from "./login-user-response";
import { ILoginUser } from "./ports/login-user";

export class LoginUser implements ILoginUser {

    constructor(private readonly userRepository: UserRepository) { }

    // login(email: string, password: string): Promise<UserData> {
    //     return this.userRepository.login(email, password)
    // }

    async login(email: string, password: string): Promise<UserData> {

        const user = this.userRepository.login(email, password)

        return user
    }

}