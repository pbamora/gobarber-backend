import { Request, Response } from 'express'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import { container } from 'tsyringe'

export default class AvatarUsersController {
  public async update(req: Request, res: Response): Promise<Response> {
    // Pegamos a instância do nosso serviço
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    // Passamos os parametros da request para o nosso método execute dentro do service
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    })

    // utilizamos como resposta o proprio usuario
    return res.json(user)
  }
}
