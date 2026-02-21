import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";

interface DeleteUserUseCaseRequest {
  publicId: string;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ publicId }: DeleteUserUseCaseRequest) {
    const user = await this.usersRepository.findBy({ publicId });
    if (!user) {
      throw new ResourceNotFoundError();
    }

    await this.usersRepository.delete(user.id)
  }
}
