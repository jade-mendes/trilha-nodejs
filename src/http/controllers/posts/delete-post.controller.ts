import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeDeletePostUseCase } from "@/use-cases/factories/make-delete-post-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getParamsSchema = z.object({
      publicId: z.uuid(),
    });

    const { publicId } = getParamsSchema.parse(request.params);
    const deletePostUseCase = makeDeletePostUseCase();
    await deletePostUseCase.execute({ publicId });
    return reply.status(200).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
