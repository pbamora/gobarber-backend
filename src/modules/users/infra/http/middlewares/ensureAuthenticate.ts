import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

// Interceptador que verifica a autenticidade do user
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Pegando o bearer + token que vem no header da request
  const authHeader = request.headers.authorization

  // Se não tiver o bearer + token no header lançamos o erro
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  // Desestruturamos o bearer + token para pegar somente token
  const [, token] = authHeader.split(' ')

  try {
    // Utilizamos o método verify do jwtwebtoken para verificar se
    // o token recebido é válido e comparamos com o segredo.(Verify descriptografa o token)
    const decoded = verify(token, authConfig.jwt.secret)

    // pegamos o sub que vem no payload do token ja verificado
    const { sub } = decoded as TokenPayload

    // agora devolvemos o sub como id do usuário
    request.user = {
      id: sub,
    }

    console.log(request.user.id)

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}
