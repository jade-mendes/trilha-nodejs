import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { GetUserUseCase } from "../users/get-user.js";

export function makeGetUserUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(usersRepository)
    return getUserUseCase
}