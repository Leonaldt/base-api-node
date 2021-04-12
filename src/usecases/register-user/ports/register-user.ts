import { UserData } from '../../../entities/user/user-data'
import { RegisterUserResponse } from '../register-user-response'

export interface IRegisterUser {
    register: (user: UserData) => Promise<RegisterUserResponse>
}