import type { FastifyRequest, FastifyReply } from "fastify";
import { UserPresenter } from "@/http/presenters/user-presenter.js";
import { makeListUsersUseCase } from "@/use-cases/factories/make-list-users-use-case.js";

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const listUsersUseCase = makeListUsersUseCase();
    const { users } = await listUsersUseCase.execute();
    return reply.status(201).send(UserPresenter.toHTTP(users));
  } catch (error) {
    throw error
  }
}
