import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticaUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
    // pegamos as informações do usuário no corpo da requisição
    const { email, password } = request.body

    // fazemos uma instancia do serviço de autenticação
    const authenticateUser = new AuthenticateUserService()
  
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
