import { LoginUserController } from '../../adapters/presentation/controllers/login-user'
import { UserUseCase } from '../../usecases/user/user'
import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'

export const makeLoginUserController = (): LoginUserController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const userUseCase = new UserUseCase(mongodbUserRepository)
  const userController = new LoginUserController(userUseCase)
  return userController
}
