import { RegisterUserController } from '../../adapters/presentation/controllers/register-user-controller'
import { Request, Response } from 'express'
import { HttpRequest } from '../../adapters/presentation/controllers/ports/http'
import { LoginUserController } from '../../adapters/presentation/controllers/login-user-controller'

export const adaptRoute = (controller: RegisterUserController | LoginUserController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
