import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { SignInController } from '../../adapters/presentation/controllers/sign-in'
import { LoginUser } from '../../usecases/login-user/login-user'

export const makeLoginUserController = (): SignInController => {
    const mongodbUserRepository = new MongodbUserRepository()
    const loginUserController = new LoginUser(mongodbUserRepository)
    const registerUserController = new SignInController(loginUserController)
    return registerUserController
}
