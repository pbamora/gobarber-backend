import { startOfHour } from 'date-fns'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import Appointment from '@modules/appoitments/infra/typeorm/entities/Appoitments'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appoinmentDate = startOfHour(date)

    const findAppoitmentInSameDate = await this.appointmentsRepository.findByDate(
      appoinmentDate,
    )

    if (findAppoitmentInSameDate) {
      throw new AppError('this appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id: provider_id,
      date: appoinmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
