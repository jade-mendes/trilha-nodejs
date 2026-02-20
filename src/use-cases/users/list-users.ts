import type { User } from "@/@types/prisma/client.js";
import type { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";


type ListUsersUseCaseResponse = {
  users: User[];
};

export class ListUsersUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}
  async execute(): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.list()
    return { users }
  }
}
