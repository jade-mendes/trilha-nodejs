import type { FastifyRequest, FastifyReply } from "fastify";
import { UserPresenter } from "@/http/presenters/user-presenter.js";
import z from "zod";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeUpdateUserUseCase } from "@/use-cases/factories/make-update-user-use-case.js";
import {
  MAX_USERNAME_SIZE,
  MIN_USERNAME_SIZE,
} from "@/constants/validation-constants.js";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    });

    const { publicId } = getParamsSchema.parse(request.params);

    const updateBodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(MIN_USERNAME_SIZE)
        .max(MAX_USERNAME_SIZE)
        .optional(),
      email: z.email().optional(),
    });

    const { name, email } = updateBodySchema.parse(request.body);

    const updateUserUseCase = makeUpdateUserUseCase();

    const { user } = await updateUserUseCase.execute({
      publicId,
      name,
      email,
    });
    return reply.status(200).send(UserPresenter.toHTTP(user));
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
