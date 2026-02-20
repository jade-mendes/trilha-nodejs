import type { FastifyInstance } from 'fastify';
import { createUser } from './create-user.controller.js'
import { listUsers } from './list-users.controller.js';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', createUser)
    app.get('/', listUsers)
}