import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { auth } from '../middleware/auth';
import { makeLoginUserController } from '../factories/login-user';

export default (router: Router): void => {
    router.post('/login', auth, adaptRoute(makeLoginUserController()))
}
