import AuthenticateUserService from '@modules/users/services/AuthenticaUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class SessionUsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    // pegamos as informações do usuário no corpo da requisição
    const { email, password } = request.body

    // fazemos uma instancia do serviço de autenticação
    const authenticateUser = container.resolve(AuthenticateUserService)

    // fazemos uma desestruturação e pegamos o usuário e seu token
    // Passamos o seu email e senha para o serviço
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    // Retornamos o usuário completo e o token dele
    return response.json({ user, token })
  }
}
