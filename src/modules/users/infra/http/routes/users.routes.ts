import { response, Router } from 'express'
import CreateUserService from '@modules/users/services/CreateUserService'
import multer from 'multer'
import uploadConfig from '@config/Upload'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'
import UsersRepository from '../../typeorm/repositories/UsersRepository'
import { container } from 'tsyringe'

const userRoute = Router()

interface UserInterface {
  name: string
  email: string
  password?: string
}

const upload = multer(uploadConfig)

//Autenticando usuário passando as informações pelo body
userRoute.post('/', async (request, response) => {
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
})

// Utilizamos o patch para alterar uma unica informação, aqui vamos editar
// a imagem do avatar do usuário.
//para isso o usuário deve estar autenticado, então passamos o middleware
//ensureAuthenticated para esse rota.
userRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    // Pegamos a instância do nosso serviço
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    // Passamos os parametros da request para o nosso método execute dentro do service
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    })

    // utilizamos como resposta o proprio usuario
    return response.json(user)
  },
)

export default userRoute
