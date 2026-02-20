import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import {
  MIN_PASSWORD_SIZE,
  MAX_PASSWORD_SIZE,
  MIN_USERNAME_SIZE,
  MAX_USERNAME_SIZE
} from "@/constants/validation-constants.js";
import { CreateUserUseCase } from "@/use-cases/users/create-user.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { UserPresenter } from "@/http/presenters/user-presenter.js";


export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().trim().min(MIN_USERNAME_SIZE).max(MAX_USERNAME_SIZE),
    email: z.email(),
    password: z.string().min(MIN_PASSWORD_SIZE).max(MAX_PASSWORD_SIZE),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);
  
  const usersRepository = new PrismaUsersRepository()
  const { user } = await new CreateUserUseCase(usersRepository).execute({
    name,
    email,
    password
  })

  return reply.status(201).send(UserPresenter.toHTTP(user));
}
