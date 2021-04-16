import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddUserController } from '../factories/add-user'

export default (router: Router): void => {
  router.post('/users', adaptRoute(makeAddUserController()))
}
