import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from '../controllers/errors/missing-param-error'
import { badRequest, serverError, ok } from './helpers/http-helper'
import { LoginUser } from '../../../usecases/login-user/login-user'
import * as bcrypt from 'bcryptjs'
import { UserData } from '../../../entities/user/user-data'

export class LoginUserController {

    constructor(private readonly loginUser: LoginUser) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            if (!httpRequest.body.email || !httpRequest.body.password) {
                const field = !httpRequest.body.email ? 'email' : 'password'
                return badRequest(new MissingParamError(field))
            }

            const userData = { email: httpRequest.body.email, password: httpRequest.body.password, }
            const loginUserResponse: UserData = await this.loginUser.login(userData.email, userData.password)
            
            if (!loginUserResponse) {
                return badRequest(new MissingParamError('Unable to login'))
            }

            const isMatch = await bcrypt.compare(userData.password, loginUserResponse.password)
            if (!isMatch) {
                return badRequest(new MissingParamError('Unable to login'))
            }

            return ok(userData)
        } catch (error) {
            return serverError('internal')
        }
    }
}
