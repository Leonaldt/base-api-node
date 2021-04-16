import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeFindAllUsersController } from '../factories/find-all-users'

export default (router: Router): void => {
    router.get('/users', adaptRoute(makeFindAllUsersController()))
}
