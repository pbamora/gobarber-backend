import AuthenticateUserService from '@modules/users/services/AuthenticaUserService'
import { Router } from 'express'
import SessionUsersController from '../controllers/SessionUsersController'

const sessionsRouter = Router()
const sessionUsersController = new SessionUsersController()

sessionsRouter.post('/', sessionUsersController.create)

export default sessionsRouter
