import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { LoginUserController } from '../../adapters/presentation/controllers/login-user-controller'
import { LoginUser } from '../../usecases/login-user/login-user'

export const makeLoginUserController = (): LoginUserController => {
    const mongodbUserRepository = new MongodbUserRepository()
    const loginUserController = new LoginUser(mongodbUserRepository)
    const registerUserController = new LoginUserController(loginUserController)
    return registerUserController
}
