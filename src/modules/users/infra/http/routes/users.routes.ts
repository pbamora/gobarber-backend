import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/Upload'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'
import AvatarUserController from '@modules/users/infra/http/controllers/AvatarUsersController'
import UsersController from '../controllers/UsersController'

const userRoute = Router()

const upload = multer(uploadConfig)

const usersController = new UsersController()
const avatarUserController = new AvatarUserController()

//Autenticando usuário passando as informações pelo body
userRoute.post('/', usersController.create)

// Utilizamos o patch para alterar uma unica informação, aqui vamos editar
// a imagem do avatar do usuário.
//para isso o usuário deve estar autenticado, então passamos o middleware
//ensureAuthenticated para esse rota.
userRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarUserController.update,
)

export default userRoute
