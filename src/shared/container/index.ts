import { container } from 'tsyringe'

import IAppointmentsRepository from '@modules/appoitments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@modules/appoitments/infra/typeorm/repositories/AppoitmentsRepository'

import IUsersRepository from '@modules/users/repositories/IUserRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
