import { UserRepository } from '../../../usecases/ports/user-repository'
import { UserData } from '../../../entities/user/user-data'
import { MongoHelper } from './helpers/mongo-helper'
export class MongodbUserRepository implements UserRepository {

  private readonly userCollection = MongoHelper.getCollection('users')

  async add(user: UserData): Promise<void> {
    const exists = await this.exists(user.email)
    if (!exists) {
      await this.userCollection.insertOne(user)
    }
  }

  async delete(id: any): Promise<any> {
    console.log('id: ', id)
    // const user = await this.findUserById(id)

    // if (user) {
    return await this.userCollection.deleteOne({ _id: id })
    // }

    // return user
  }

  async exists(email: string): Promise<boolean> {
    const result = await this.findUserByEmail(email)
    if (result != null) {
      if (result.email === email) {
        return true
      }
    }
    return false
  }

  async findAllUsers(): Promise<UserData[]> {
    return await MongoHelper.getCollection('users').find().toArray()
  }

  async findUserById(id: any): Promise<UserData> {
    const userCollection = MongoHelper.getCollection('users')
    console.log('id: ', id)
    const result = await userCollection.findOne({ "_id": id })
    console.log('result: ', result)
    return result
  }

  async findUserByEmail(email: string): Promise<UserData> {
    console.log('email: ', email)
    const userCollection = MongoHelper.getCollection('users')
    const result = await userCollection.findOne({ email: email })
    console.log('result: ', result)
    return result
  }
}
