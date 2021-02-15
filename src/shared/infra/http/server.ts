import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import routes from '@shared/infra/http/routes/index'

import '@shared/infra/typeorm/index'
import uploadConfig from '@config/Upload'
import AppError from '@shared/errors/AppError'

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

// criamos um middleware que vai verificar todos os erros do app
// se for um erro originado nas rotas por conta de parametros errados ou informações erradas
// o error e mensagem vão ser correspondidas
// caso o erro for originado por algo que não foi esperado no nosso código
// a resposta vai ser 500
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }

    console.error(error)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  },
)

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
