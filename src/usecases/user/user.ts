import { InvalidEmailError } from '../../entities/user/errors/invalid-email'
import { InvalidNameError } from '../../entities/user/errors/invalid-name'
import { User } from '../../entities/user/user'
import { UserData } from '../../entities/user/user-data'
import { Either, left, right } from '../../shared/either'
import { UserRepository } from '../ports/user-repository'
import { IUserUseCase } from './ports/iuser-usecase'
import { UserResponse } from './ports/user-response'

export class UserUseCase extends IUserUseCase {

    constructor(private readonly userRepository: UserRepository) {
        super()
    }

    async add(userData: UserData): Promise<UserResponse> {
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

    delete(id: any): Promise<UserData> {
        return this.userRepository.delete(id)
    }

    findAllUsers(): Promise<UserData[]> {
        return this.userRepository.findAllUsers()
    }

    findUserByEmail(email: string): Promise<UserData> {
        return this.userRepository.findUserByEmail(email)
    }

    findUserById(id: any): Promise<UserData> {
        return this.userRepository.findUserById(id)
    }

    exists(email: string): Promise<boolean> {
        return this.userRepository.exists(email)
    }
}
