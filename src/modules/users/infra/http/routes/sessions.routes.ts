import { Router } from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticaUserService'
import UserRepository from '../../typeorm/repositories/UserRepository'

const sessionsRouter = Router()


sessionsRouter.post('/', async (request, response) => {
  // pegamos as informações do usuário no corpo da requisição
  const { email, password } = request.body
  const userRepository = new UserRepository()
  // fazemos uma instancia do serviço de autenticação
  const authenticateUser = new AuthenticateUserService(userRepository)

  // fazemos uma desestruturação e pegamos o usuário e seu token
  // Passamos o seu email e senha para o serviço
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  })

  // Retornamos o usuário completo e o token dele
  return response.json({ user, token })
})

export default sessionsRouter
