import Appointment from '@modules/appoitments/infra/typeorm/entities/Appoitments'
import IAppointmentsRepository from '@modules/appoitments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO'
import { uuid } from 'uuidv4'

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointments => appointments.date === date,
    )

    return findAppointment
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid,
      date: date,
      provider_id: provider_id,
    })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository
