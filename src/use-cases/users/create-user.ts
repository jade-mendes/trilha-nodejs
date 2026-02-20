import type { User } from "@/@types/prisma/client.js";
import { env } from "@/env/index.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { hash } from "bcryptjs";
import { UserAlreadyExsistsError } from "../errors/user-already-exists-error.js";

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
      throw new UserAlreadyExsistsError()
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
