import User from '@modules/users/infra/typeorm/entities/Users'
import AppError from '@shared/errors/AppError'

import { hash } from 'bcryptjs'
import IUsersRepository from '../repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email adress already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}

export default CreateUserService
