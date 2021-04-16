import { UserUseCase } from '../../usecases/user/user'
import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { FindAllUsersController } from '../../adapters/presentation/controllers/find-all-users'

export const makeFindAllUsersController = (): FindAllUsersController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const userUseCase = new UserUseCase(mongodbUserRepository)
  const userController = new FindAllUsersController(userUseCase)
  return userController
}
