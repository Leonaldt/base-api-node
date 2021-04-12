import { UserData } from '../../entities/user/user-data'
import { UserRepository } from '../ports/user-repository'
import { left, right, Either } from '../../shared/either'
import { RegisterUserResponse } from './register-user-response'
import { User } from '../../entities/user/user'
import { InvalidNameError } from '../../entities/user/errors/invalid-name'
import { InvalidEmailError } from '../../entities/user/errors/invalid-email'
import { IRegisterUser } from './ports/register-user';

export class RegisterUser implements IRegisterUser {

  constructor(private readonly userRepository: UserRepository) {
  }

  async register(userData: UserData): Promise<RegisterUserResponse> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(userData)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const user: User = userOrError.value
    const exists = this.userRepository.exists(user.email.value)
    if (!(await exists).valueOf()) {
      await this.userRepository.add({ name: user.name.value, email: user.email.value, password: userData.password })
    }
    return right(userData)
  }
}
