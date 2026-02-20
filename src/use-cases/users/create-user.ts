import type { User } from "@/@types/prisma/client.js";
import { env } from "@/env/index.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { hash } from "bcryptjs";

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type CreateUserUseCaseResponse = {
  user: User;
};

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("E-mail already taken.");
    }

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS);

    const user = await this.usersRepository.create({
        name,
        email,
        passwordHash
    })

    return { user };
  }
}
