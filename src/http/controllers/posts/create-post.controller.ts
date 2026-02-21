import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { makeCreatePostUseCase } from "@/use-cases/factories/make-create-post-use-case.js";

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createPostParamsSchema = z.object({
      userPublicId: z.uuid(),
    });

    const { userPublicId } = createPostParamsSchema.parse(request.params);
    const createPostBodySchema = z.object({
      title: z.string().trim().min(1).max(100),
      content: z.string().trim().min(1).max(100),
    });

    const { title, content } = createPostBodySchema.parse(request.body);

    const createPostUseCase = makeCreatePostUseCase();

    const { post } = await createPostUseCase.execute({
      title,
      content,
      userPublicId,
    });

    return reply.status(200).send(post);
  } catch (error) {
    throw error;
  }
}
