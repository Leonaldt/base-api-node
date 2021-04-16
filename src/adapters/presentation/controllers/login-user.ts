import { HttpRequest, HttpResponse } from './ports/http'
import { serverError, ok, badRequest } from './helpers/http-helper'
import { UserUseCase } from '../../../usecases/user/user'
import { MissingParamError } from './errors'
import * as bcrypt from 'bcryptjs';
import { UserData } from '../../../entities/user/user-data';

export class LoginUserController {

    constructor(private readonly userUseCase: UserUseCase) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            if (!httpRequest.body.email || !httpRequest.body.password) {
                const field = !httpRequest.body.email ? 'email' : 'password'
                return badRequest(new MissingParamError(field))
            }

            const userData = { email: httpRequest.body.email, password: httpRequest.body.password, }
            const user: UserData = await this.userUseCase.findUserByEmail(userData.email)

            if (!user) {
                return badRequest(new MissingParamError('Unable to login'))
            }

            const isMatch = await bcrypt.compare(userData.password, user.password)
            if (!isMatch) {
                return badRequest(new MissingParamError('Unable to login'))
            }

            return ok({ id: user._id, name: user.name, email: user.email })
        } catch (error) {
            return serverError('internal')
        }
    }
}
