import 'reflect-metadata'

import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

describe('CreateAppoitment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    )

    const appointment = createAppointmentService.execute({
      date: new Date(),
      provider_id: '012356412000',
    })

    expect((await appointment).provider_id).toBe('012356412000')
  })

  // it('should no be able to create two appointments on the same time', () => {
  //   expect(1 + 2).toBe(3)
  // })
})
