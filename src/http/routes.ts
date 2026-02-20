import type { FastifyInstance } from 'fastify';
import { usersRoutes } from './controllers/users/users.routes.js'

export async function appRoutes(app: FastifyInstance) {
    app.register(usersRoutes, {prefix: '/users'})
}