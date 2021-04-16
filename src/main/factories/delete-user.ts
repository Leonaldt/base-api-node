import { UserUseCase } from '../../usecases/user/user'
import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { DeleteUserController } from '../../adapters/presentation/controllers/delete-user'

export const makeDeleteUserController = (): DeleteUserController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const userUseCase = new UserUseCase(mongodbUserRepository)
  const userController = new DeleteUserController(userUseCase)
  return userController
}
