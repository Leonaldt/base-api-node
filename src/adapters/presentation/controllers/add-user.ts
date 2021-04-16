import { HttpRequest, HttpResponse } from './ports/http'
import { serverError, ok, badRequest } from './helpers/http-helper'
import { UserUseCase } from '../../../usecases/user/user'
import { MissingParamError } from './errors'
import * as bcrypt from 'bcryptjs';
import { UserResponse } from '../../../usecases/user/ports/user-response';
import { SendEmailResponse } from '../../../usecases/send-email-to-user-welcome/send-email-response';
import { SendEmail } from '../../../usecases/send-email-to-user-welcome/send-email';

export class AddUserController {

    constructor(
        private readonly userUseCase: UserUseCase,
        private readonly sendEmailToUser: SendEmail
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            if (!httpRequest.body.name || !httpRequest.body.email || !httpRequest.body.password) {
                const field = !httpRequest.body.name ? 'name' : !httpRequest.body.email ? 'email' : 'password'
                return badRequest(new MissingParamError(field))
            }

            const password = await bcrypt.hash(httpRequest.body.password, 8)
            const userData = { name: httpRequest.body.name, email: httpRequest.body.email, password: password }
            const registerUserResponse: UserResponse = await this.userUseCase.add(userData)
            if (registerUserResponse.isLeft()) {
                return badRequest(registerUserResponse.value)
            }
            const sendEmailResponse: SendEmailResponse = await this.sendEmailToUser.sendEmailToUserWelcome(userData)
            if (sendEmailResponse.isLeft()) {
                return badRequest(sendEmailResponse.value)
            }
            return ok(userData)
        } catch (error) {
            return serverError('internal')
        }
    }
}
