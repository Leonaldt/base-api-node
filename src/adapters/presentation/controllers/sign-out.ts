import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest, serverError, ok } from './helpers/http-helper'
import { RegisterUser } from '../../../usecases/register-user/register-user'
import { SendEmail } from '../../../usecases/send-email-to-user-welcome/send-email'
import { SendEmailResponse } from '../../../usecases/send-email-to-user-welcome/send-email-response'
import { RegisterUserResponse } from '../../../usecases/register-user/register-user-response'
import * as bcrypt from 'bcryptjs';
export class RegisterUserController {
  private readonly registerUser: RegisterUser
  private readonly sendEmailToUser: SendEmail

  constructor(registerUser: RegisterUser, sendEmailToUser: SendEmail) {
    this.registerUser = registerUser
    this.sendEmailToUser = sendEmailToUser
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.name || !httpRequest.body.email || !httpRequest.body.password) {
        const field = !httpRequest.body.name ? 'name' : !httpRequest.body.email ? 'email' : 'password'
        return badRequest(new MissingParamError(field))
      }

      const password = await bcrypt.hash(httpRequest.body.password, 8)
      const userData = { name: httpRequest.body.name, email: httpRequest.body.email, password: password }
      const registerUserResponse: RegisterUserResponse = await this.registerUser.register(userData)
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
