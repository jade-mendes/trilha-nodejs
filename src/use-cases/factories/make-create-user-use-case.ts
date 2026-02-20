import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { CreateUserUseCase } from "../users/create-user.js";

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  return createUserUseCase;
}
