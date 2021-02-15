import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IUsersRepository from '@modules/users/repositories/IUserRepository'
import { getRepository, Repository } from 'typeorm'
import User from '../entities/Users'

class UsersRepository implements IUsersRepository {
  private ormRespository: Repository<User>

  constructor() {
    this.ormRespository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRespository.findOne(id)

    return findUser
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRespository.findOne({
      where: { email: email },
    })

    return findUser
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRespository.create({
      email,
      name,
      password,
    })

    await this.ormRespository.save(user)

    return user
  }

  public async save(data: User): Promise<User> {
    const userUpdate = await this.ormRespository.save(data)

    return userUpdate
  }
}

export default UsersRepository
