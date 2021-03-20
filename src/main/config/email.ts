import { EmailOptions } from '../../usecases/ports/email-service'

const attachments = []

export function getEmailOptions(): EmailOptions {
  const from = 'Leonidas | API <leonidas.ollima@gmail.com>'
  const to = ''
  const mailOptions: EmailOptions = {
    host: process.env.EMAIL_HOST,
    port: Number.parseInt(process.env.EMAIL_PORT),
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    from: from,
    to: to,
    subject: 'Bem-vindo!',
    text: 'Estou criando uma api rest com express, mongodb e clean architecture. \n \n' +
      'Leonidas Ollima | API Rest',
    html: 'Estou criando uma api rest com <b>express, mongodb e clean architecture</b>. <br> <br>' +
      '<b>Leonidas Ollima | API Rest</b> <br> <br> ',
    attachments: attachments
  }
  return mailOptions
}
