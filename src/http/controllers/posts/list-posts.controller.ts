import { PostPresenter } from "@/http/presenters/post-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeListPostsUseCase } from "@/use-cases/factories/make-list-posts-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function listPosts(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const listPostsUseCase = makeListPostsUseCase();
    const { posts } = await listPostsUseCase.execute();
    return reply.status(200).send(PostPresenter.toHTTP(posts));
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error;
  }
}
