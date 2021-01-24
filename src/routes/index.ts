import { Router } from 'express'
import appointmentsRouter from './appointments.routes'
import userRoute from './users.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', userRoute)
routes.use('/sessions', sessionsRouter)

export default routes
