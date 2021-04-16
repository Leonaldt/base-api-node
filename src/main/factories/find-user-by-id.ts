import { UserUseCase } from '../../usecases/user/user'
import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { FindUserByIdController } from '../../adapters/presentation/controllers/find-user-by-id'

export const makeFindUserByIdController = (): FindUserByIdController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const userUseCase = new UserUseCase(mongodbUserRepository)
  const userController = new FindUserByIdController(userUseCase)
  return userController
}
