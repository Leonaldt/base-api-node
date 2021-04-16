import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest, serverError, ok } from './helpers/http-helper'
import { LoginUser } from '../../../usecases/login-user/login-user'
import * as bcrypt from 'bcryptjs'
import { UserData } from '../../../entities/user/user-data'

export class SignInController {

    constructor(private readonly signInUseCase: LoginUser) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            if (!httpRequest.body.email || !httpRequest.body.password) {
                const field = !httpRequest.body.email ? 'email' : 'password'
                return badRequest(new MissingParamError(field))
            }

            const userData = { email: httpRequest.body.email, password: httpRequest.body.password, }
            const loginUserResponse: UserData = await this.signInUseCase.perform(userData.email, userData.password)

            if (!loginUserResponse) {
                return badRequest(new MissingParamError('Unable to login'))
            }

            const isMatch = await bcrypt.compare(userData.password, loginUserResponse.password)
            if (!isMatch) {
                return badRequest(new MissingParamError('Unable to login'))
            }

            return ok({ id: loginUserResponse._id, name: loginUserResponse.name, email: loginUserResponse.email })
        } catch (error) {
            return serverError('internal')
        }
    }
}
