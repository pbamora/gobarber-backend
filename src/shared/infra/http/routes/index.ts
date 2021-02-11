import { Router } from 'express'
import appointmentsRouter from '@modules/appoitments/infra/http/routes/appointments.routes'
import userRoute from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', userRoute)
routes.use('/sessions', sessionsRouter)

export default routes
