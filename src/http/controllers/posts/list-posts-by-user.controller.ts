import { PostPresenter } from "@/http/presenters/post-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeListPostsByUserUseCase } from "@/use-cases/factories/make-list-posts-by-user-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function listPostsByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getParamsSchema = z.object({
        publicId: z.string()
    })
    const { publicId } = getParamsSchema.parse(request.params)
    const listPostsByUserUseCase = makeListPostsByUserUseCase();
    const { posts } = await listPostsByUserUseCase.execute({publicId})
    return reply.status(200).send(PostPresenter.toHTTP(posts))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
