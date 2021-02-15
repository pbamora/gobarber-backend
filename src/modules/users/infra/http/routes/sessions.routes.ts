import { Router } from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticaUserService'
<<<<<<< HEAD

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  // pegamos as informações do usuário no corpo da requisição
  const { email, password } = request.body

  // fazemos uma instancia do serviço de autenticação
  const authenticateUser = new AuthenticateUserService()
=======
import UserRepository from '../../typeorm/repositories/UserRepository'

const sessionsRouter = Router()


sessionsRouter.post('/', async (request, response) => {
  // pegamos as informações do usuário no corpo da requisição
  const { email, password } = request.body
  const userRepository = new UserRepository()
  // fazemos uma instancia do serviço de autenticação
  const authenticateUser = new AuthenticateUserService(userRepository)
>>>>>>> c805773440d6711df681c7c736ea023fb882723d

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
