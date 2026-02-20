import type { FastifyInstance } from 'fastify';
import { createUser } from './create-user.controller.js'
import { listUsers } from './list-users.controller.js';
import { getUser } from './get-user.controller.js';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', createUser)
    app.get('/', listUsers)
    app.get('/:publicId', getUser)
}