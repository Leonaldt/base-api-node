import { HttpResponse } from './ports/http'
import { serverError, ok } from './helpers/http-helper'
import { UserUseCase } from '../../../usecases/user/user'

export class FindAllUsersController {

    constructor(private readonly userUseCase: UserUseCase) { }

    async handle(): Promise<HttpResponse> {
        
        try {
            return ok(await this.userUseCase.findAllUsers())
        } catch (error) {
            return serverError('internal')
        }
    }
}
