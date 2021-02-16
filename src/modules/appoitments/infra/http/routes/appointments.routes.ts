import { Router } from 'express'
import { parseISO } from 'date-fns'

import CreateAppointmentService from '@modules/appoitments/services/CreateAppointmentService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'
import { container } from 'tsyringe'
import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

const appointmentsController = new AppointmentsController()

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = new AppointmentsRepository()

//   const appointments = await appointmentsRepository.find()

//   return response.json(appointments)
// })

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
