import { RegisterUserController } from '../../adapters/presentation/controllers/register-user-controller'
import { RegisterUser } from '../../usecases/register-user/register-user'
import { MongodbUserRepository } from '../../external/repositories/mongodb/mongodb-user-repository'
import { NodemailerEmailService } from '../../external/mail-services/nodemailler-email-service'
import { SendEmailToUserWelcome } from '../../usecases/send-email-to-user-welcome/send-email-to-user-welcome'
import { getEmailOptions } from '../config/email'

export const makeRegisterUserController = (): RegisterUserController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingList = new RegisterUser(mongodbUserRepository)
  const nodemailerEmailService = new NodemailerEmailService()
  const sendEmailToUserWithBonus = new SendEmailToUserWelcome(getEmailOptions(), nodemailerEmailService)
  const registerUserController = new RegisterUserController(registerUserOnMailingList, sendEmailToUserWithBonus)
  return registerUserController
}
