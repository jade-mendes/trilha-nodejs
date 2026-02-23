import type { FastifyInstance } from 'fastify';
import { createPost } from './create-post.controller.js';
import { listPosts } from './list-posts.controller.js';


export async function postsRoutes(app: FastifyInstance) {
    app.post('/:userPublicId', createPost)
    app.get('/', listPosts)
}