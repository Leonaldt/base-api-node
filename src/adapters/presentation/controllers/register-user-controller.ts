import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from '../controllers/errors/missing-param-error'
import { badRequest, serverError, ok } from './helpers/http-helper'
import { RegisterUser } from '../../../usecases/register-user/register-user'
import { SendEmail } from '../../../usecases/send-email-to-user-welcome/send-email'
import { SendEmailResponse } from '../../../usecases/send-email-to-user-welcome/send-email-response'
import { RegisterUserResponse } from '../../../usecases/register-user/register-user-response'

export class RegisterUserController {
  private readonly registerUser: RegisterUser
  private readonly sendEmailToUser: SendEmail

  constructor (registerUser: RegisterUser, sendEmailToUser: SendEmail) {
    this.registerUser = registerUser
    this.sendEmailToUser = sendEmailToUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.name || !httpRequest.body.email) {
        const field = !httpRequest.body.name ? 'name' : 'email'
        return badRequest(new MissingParamError(field))
      }
      const userData = { name: httpRequest.body.name, email: httpRequest.body.email }
      const registerUserResponse: RegisterUserResponse = await this.registerUser.registerUser(userData)
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
