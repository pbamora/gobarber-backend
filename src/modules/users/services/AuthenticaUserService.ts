import User from '@modules/users/infra/typeorm/entities/Users'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

import { compare } from 'bcryptjs'
import IUsersRepository from '../repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // fazemos a verificação do usuário
    const user = await this.usersRepository.findByEmail(email)

    // se ele não existir mandamos um erro
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    // fazemos a comparação da senha que o usuario digitou com a senha que está no banco
    // descriptografa a senha que esta no banco
    const passwordMatched = await compare(password, user.password)

    // Se a senha não bater lançamos um erro
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    // Criamos o token do usuário e passamos o id do usuário como sub do token para
    // saber qual usuário gerou o token
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiredIn,
    })

    // retornamos o usuário e a senha
    return {
      user,
      token,
    }
  }
}
export default AuthenticateUserService
