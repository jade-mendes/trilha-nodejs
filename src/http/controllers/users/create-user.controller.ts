import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import {
  MIN_PASSWORD_SIZE,
  MAX_PASSWORD_SIZE,
  MIN_USERNAME_SIZE,
  MAX_USERNAME_SIZE,
} from "@/constants/validation-constants.js";
import { UserPresenter } from "@/http/presenters/user-presenter.js";
import { UserAlreadyExsistsError } from "@/use-cases/errors/user-already-exists-error.js";
import { makeCreateUserUseCase } from "@/use-cases/factories/make-create-user-use-case.js";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      name: z.string().trim().min(MIN_USERNAME_SIZE).max(MAX_USERNAME_SIZE),
      email: z.email(),
      password: z.string().min(MIN_PASSWORD_SIZE).max(MAX_PASSWORD_SIZE),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    const createUserUseCase = makeCreateUserUseCase()
    const { user } = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send(UserPresenter.toHTTP(user));
  } catch (error) {
    if (error instanceof UserAlreadyExsistsError) {
      return reply.status(409).send({message: error.message})
    }
  }
}
