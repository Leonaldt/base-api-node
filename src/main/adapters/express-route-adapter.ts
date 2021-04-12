import { RegisterUserController } from '../../adapters/presentation/controllers/sign-out'
import { Request, Response } from 'express'
import { HttpRequest } from '../../adapters/presentation/controllers/ports/http'
import { SignInController } from '../../adapters/presentation/controllers/sign-in'

export const adaptRoute = (controller: RegisterUserController | SignInController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
