import type { FastifyInstance } from 'fastify';
import { usersRoutes } from './controllers/users/users.routes.js'
import { postsRoutes } from './controllers/posts/posts.routes.js';

export async function appRoutes(app: FastifyInstance) {
    app.register(usersRoutes, {prefix: '/users'})
    app.register(postsRoutes, {prefix: '/posts'})
}