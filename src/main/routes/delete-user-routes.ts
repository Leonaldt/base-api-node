import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeDeleteUserController } from '../factories/delete-user'

export default (router: Router): void => {
  router.delete('/users/:id', adaptRoute(makeDeleteUserController()))
}
