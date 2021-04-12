import { Request, Response, NextFunction } from 'express'

export const auth = (req: Request, res: Response, next: NextFunction): void => {

    console.log('auth...!')

    next()
}
