import { UserUseCase } from '../../usecases/user/user'
import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { NodemailerEmailService } from '../../external/mail-services/nodemailler-email-service'
import { SendEmailToUserWelcome } from '../../usecases/send-email-to-user-welcome/send-email-to-user-welcome'
import { getEmailOptions } from '../config/email'
import { AddUserController } from '../../adapters/presentation/controllers/add-user'

export const makeAddUserController = (): AddUserController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const userUseCase = new UserUseCase(mongodbUserRepository)
  const nodemailerEmailService = new NodemailerEmailService()
  const sendEmailToUserWithBonus = new SendEmailToUserWelcome(getEmailOptions(), nodemailerEmailService)
  const userController = new AddUserController(userUseCase, sendEmailToUserWithBonus)
  return userController
}
