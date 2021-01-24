import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/appError'

import Appointment from '../models/Appoitments'
import AppointmentsRepository from '../repositories/AppoitmentsRepository'

interface Request {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appoinmentDate = startOfHour(date)

    const findAppoitmentInSameDate = await appointmentsRepository.findByDate(
      appoinmentDate,
    )

    if (findAppoitmentInSameDate) {
      throw new AppError('this appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id: provider_id,
      date: appoinmentDate,
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
