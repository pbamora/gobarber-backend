import { Router } from 'express'
import { parseISO } from 'date-fns'

import CreateAppointmentService from '@modules/appoitments/services/CreateAppointmentService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'
import { container } from 'tsyringe'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = new AppointmentsRepository()

//   const appointments = await appointmentsRepository.find()

//   return response.json(appointments)
// })

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = container.resolve(CreateAppointmentService)

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id: provider_id,
  })

  response.json(appointment)
})

export default appointmentsRouter
