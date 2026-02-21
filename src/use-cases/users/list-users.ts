import type { User } from "@/@types/prisma/client.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";


type ListUsersUseCaseResponse = {
  users: User[];
};

export class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute(): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.list()
    return { users }
  }
}
