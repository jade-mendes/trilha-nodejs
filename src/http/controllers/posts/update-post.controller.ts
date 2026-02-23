import {
  MAX_POST_CONTENT_SIZE,
  MAX_POST_TITLE_SIZE,
  MIN_POST_CONTENT_SIZE,
  MIN_POST_TITLE_SIZE,
} from "@/constants/validation-constants.js";
import { PostPresenter } from "@/http/presenters/post-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeUpdatePostUseCase } from "@/use-cases/factories/make-update-post-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    });

    const { publicId } = getParamsSchema.parse(request.params);
    const updateBodySchema = z.object({
      title: z
        .string()
        .trim()
        .min(MIN_POST_TITLE_SIZE)
        .max(MAX_POST_TITLE_SIZE)
        .optional(),
      content: z
        .string()
        .trim()
        .min(MIN_POST_CONTENT_SIZE)
        .max(MAX_POST_CONTENT_SIZE)
        .optional(),
    });
    const { title, content } = updateBodySchema.parse(request.body);

    const updatePostUseCase = makeUpdatePostUseCase();
    const { post } = await updatePostUseCase.execute({
      publicId,
      title,
      content,
    });

    return reply.status(200).send(PostPresenter.toHTTP(post));
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
