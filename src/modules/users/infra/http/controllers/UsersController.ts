import CreateUserService from '@modules/users/services/CreateUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

interface UserInterface {
  name: string
  email: string
  password?: string
}

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    // buscando informações no corpo
    const { name, email, password } = request.body

    // fazendo uma instancia do serviço de criação de usuário
    const createUser = container.resolve(CreateUserService)

    // utilizando o metodo execute do serviço para criar o usuário
    //passando as informações do corpo como parametro
    const user: UserInterface = await createUser.execute({
      name,
      email,
      password: password,
    })

    // deletando a senha por segurança
    delete user.password

    //retornando o usuário criado
    return response.json(user)
  }
}
