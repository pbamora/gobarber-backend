import { getRepository, Repository } from 'typeorm'
import IAppointmentsRepository from '@modules/appoitments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO'
import Appointment from '../entities/Appoitments'

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
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appoitment = this.ormRepository.create({ provider_id, date })

    await this.ormRepository.save(appoitment)

    return appoitment
  }
}

export default AppointmentsRepository
