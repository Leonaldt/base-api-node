import { Either } from '../../shared/either'
import { InvalidEmailError } from '../../entities/user/errors/invalid-email'
import { UserData } from '../../entities/user/user-data'

export type LoginUserResponse = Either<InvalidEmailError, UserData>
