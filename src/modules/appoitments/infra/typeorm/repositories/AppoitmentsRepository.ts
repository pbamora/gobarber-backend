import { getRepository, Repository } from 'typeorm'

import Appointment from '@modules/appoitments/infra/typeorm/entities/Appoitments'
import IAppointmentsRepository from '@modules/appoitments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppoitment = await this.ormRepository.findOne({
      where: { date: date },
    })

    return findAppoitment
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      date,
      provider_id,
    })

    await this.ormRepository.save(appointment)

    return appointment
  }
}

export default AppointmentsRepository
