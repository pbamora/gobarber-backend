import { Router } from 'express'
import { parseISO } from 'date-fns'

import CreateAppointmentService from '@modules/appoitments/services/CreateAppointmentService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'
import AppointmentsRepository from '../../typeorm/repositories/AppoitmentsRepository'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user)
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository)
//   const appointments = await appointmentsRepository.find()

//   return response.json(appointments)
// })

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body
  const appointmentsRepository = new AppointmentsRepository()

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService(appointmentsRepository)

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id: provider_id,
  })

  response.json(appointment)
})

export default appointmentsRouter
