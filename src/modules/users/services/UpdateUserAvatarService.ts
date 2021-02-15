import path from 'path'

import uploadConfig from '@config/Upload'
import User from '@modules/users/infra/typeorm/entities/Users'
import fs from 'fs'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
  avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    // Busca o id do usuário
    const user = await this.usersRepository.findById(user_id)

    //Se não existir usuário lançamos um erro
    if (!user) {
      throw new AppError('Only authenticate users can change avatar', 401)
    }

    //Se o usuário tiver id, precisamos deletar a imagem do avatar anterior
    if (user.avatar) {
      // Aqui utilizamos o path do node, damos join para juntar os caminhos.
      // pegamos o caminho da imagem que está no disco e juntamos com o nome do arquivo que está armazenado
      // D:/dev/express-node-config/tmp + nome do arquivo
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      // agora verificamos se esse arquivo realmente existe naquela pasta
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      // se existir deletamos
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    // Agora pegamos o novo nome do arquivo e atribuimos o valor passado lá na requisição da rota
    user.avatar = avatarFileName

    // atualizamos o usuário no repositório
    await this.usersRepository.save(user)

    // retornamos o usuário
    return user
  }
}

export default UpdateUserAvatarService
