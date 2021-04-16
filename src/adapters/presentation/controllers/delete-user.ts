import { HttpRequest, HttpResponse } from './ports/http'
import { serverError, ok, badRequest, notFound } from './helpers/http-helper'
import { UserUseCase } from '../../../usecases/user/user'
import { MissingParamError } from './errors'

export class DeleteUserController {

    constructor(
        private readonly userUseCase: UserUseCase
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        console.log('httpRequest => ', httpRequest.params.id)

        try {
            if (!httpRequest.params.id)
                return badRequest(new MissingParamError('id'))

            // const user = await this.userUseCase.findUserById(httpRequest.params.id)
            const result = this.userUseCase.delete(httpRequest.params.id)

            // console.log('user => ', user)

            // if (!user) {
            //     return notFound(new Error())
            // }

            return ok(result)
        } catch (error) {
            return serverError('internal')
        }
    }
}
