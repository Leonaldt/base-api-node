import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeFindUserByEmailController } from '../factories/find-user-by-email'
import { makeFindUserByIdController } from '../factories/find-user-by-id'

export default (router: Router): void => {
    router.get('/users/:email', adaptRoute(makeFindUserByEmailController()))
}
