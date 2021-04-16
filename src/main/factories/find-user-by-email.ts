import { UserUseCase } from '../../usecases/user/user'
import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { FindUserByEmailController } from '../../adapters/presentation/controllers/find-user-by-email'

export const makeFindUserByEmailController = (): FindUserByEmailController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const userUseCase = new UserUseCase(mongodbUserRepository)
  const userController = new FindUserByEmailController(userUseCase)
  return userController
}
