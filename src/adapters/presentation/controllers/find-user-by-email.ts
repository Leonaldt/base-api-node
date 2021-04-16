import { HttpRequest, HttpResponse } from './ports/http'
import { serverError, ok, notFound } from './helpers/http-helper'
import { UserUseCase } from '../../../usecases/user/user'

export class FindUserByEmailController {

    constructor(private readonly userUseCase: UserUseCase) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        
        try {
            const user = await this.userUseCase.findUserByEmail(httpRequest.params.email)

            if (!user)
                return notFound(new Error(''))

            return ok(user)
        } catch (error) {
            return serverError('internal')
        }
    }
}
