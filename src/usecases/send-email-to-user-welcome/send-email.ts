import { SendEmailResponse } from './send-email-response'
import { UserData } from '../../entities/user/user-data'

export interface SendEmail {
  sendEmailToUserWelcome: (user: UserData) => Promise<SendEmailResponse>
}
