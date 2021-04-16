import { UserData } from '../../entities/user/user-data'

export interface UserRepository {
  add: (user: UserData) => Promise<void>
  delete: (id: any) => Promise<any>
  findAllUsers: () => Promise<UserData[]>
  findUserByEmail: (email: string) => Promise<UserData>
  findUserById: (id: any) => Promise<UserData>
  exists: (email: string) => Promise<boolean>
}
